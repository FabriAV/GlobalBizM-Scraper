import { Actor } from 'apify';
import { PlaywrightCrawler } from 'crawlee';

const userAgentList = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
];

await Actor.init();

const { maxItems, country, industry } = (await Actor.getInput()) ?? {};
const startUrl = ['https://globalbizm.com/business/businesses-for-sale'];

let itemsProcessed = 0;
let numberPage = 0;

function format(value) {
    const newValue = (value === null || value === 0 || value === "") ? "Undisclosed" : value;
    return newValue
}

const crawler = new PlaywrightCrawler({
    preNavigationHooks: [async ({ page }) => {
        await page.route('**/*', (route) => {
            const request = route.request()
            const resourceType = request.resourceType();

            if (resourceType === 'image' || resourceType === 'stylesheet') {
                route.abort();
            } else {
                route.continue();
            }

        });

    }],
    launchContext: {
        launchOptions: {
            args: [
                '--disable-gpu',
                '--disable-blink-features=AutomationControlled',

            ],
            headless: true,
        },
        userAgent: userAgentList[Math.floor(Math.random() * 3)
        ],
    },

    async requestHandler({ pushData, page }) {
        console.log("\n🔍 SEARCHS FILTERS\n\n🌍 Selected Country: " + country + "\n🎯 Selected Industry: " + industry)
        if (country !== 'Select Country') {
            const countryInput = 'div[role="combobox"] input';
            await page.waitForSelector(countryInput);
            await page.click(countryInput);
            await page.fill(countryInput, country);
            await page.waitForTimeout(1000);
            await page.keyboard.press('Enter');
            console.log("✅ Country filter applied");
        }

        if (industry !== 'All Industries') {
            await page.click('ng-select[placeholder="All Industries"]');
            await page.click(`text="${industry}"`);
            await page.waitForTimeout(1000);
            console.log("✅ Industry filter applied");
        }

        while (itemsProcessed < maxItems) {
            numberPage++;
            await page.waitForSelector('.row.rowspaceline.pb-3.respshadow');
            const ids = await page.$$eval('.row.rowspaceline.pb-3.respshadow', (s) => {
                return s.map(n => {
                    const url = n.querySelector('.pad-left a')?.getAttribute('href').match(/[0-9]/g).join("");
                    return {
                        id: url
                    }
                });
            });
            if (ids.length === 0) {
                console.log("⚠️ No results were found on this page");
                break;
            } else {
                if (numberPage === 1) console.log("\n📝 PROGRESS");
                console.log("\n📌 Page Number: " + numberPage + " || Found Businesses: " + ids.length)
            }

            const limitedData = ids.slice(0, maxItems - itemsProcessed);
            console.log("🔄 Processing " + limitedData.length + " businesses from this page...");

            for (const business of limitedData) {
                const res = await fetch("https://api.globalbizm.com/api/business/" + business.id,
                    {
                        "method": "GET"
                    });
                const data = await res.json();
                const result = {
                    url: "https://globalbizm.com/business/business-details?businessId=" + business.id,
                    title: data.name.trim(),
                    PrimaryImage: data.imageUrls[0],
                    description: data.description.replace(/<[^>]*>/g, "").slice(0, 250).trim() + "...",
                    category: data.category.trim(),
                    askingPrice: format(data.askingPrice),
                    grossRevenue: format(data.grossRevenue),
                    cashFlow: format(data.cashFlow),
                    currency: "USD",
                    establishedYear: format(data.establishedYear),
                    city: format(data.city),
                    state: format(data.state),
                    country: format(data.country),
                    contactName: format(data.contactName),
                    contactEmail: format(data.contactEmail),
                    contactPhone: format(data.contactPhone),
                    sellingReason: format(data.sellingReason).replace(/<[^>]*>/g, "").replace(/\n/g, " ").trim(),
                }

                await pushData(result)
                itemsProcessed++

            }
            console.log("➤ Information was collected from " + limitedData.length + " businesses")
            if (itemsProcessed >= maxItems) {
                console.log("\n🎉 COMPLETED: Reached maximum items (" + maxItems + ")");
                console.log("\n✨ Scraping finished!")
                return;
            }
            const nextButton = await page.$('.mat-paginator-navigation-next');
            const isDisabled = await nextButton.getAttribute('disabled');
            if (isDisabled) {
                console.log("\n⚠️ No more pages available")
                console.log("✨ Scraping finished! Collected " + itemsProcessed + " of " + maxItems + " requested businesses");
                break;
            } else {
                console.log("\n⏭️ Moving to next page...");
                await nextButton.click();
                await page.waitForTimeout(2000);
            }

        }

    }


});

await crawler.run(startUrl);
const dataset = await Actor.openDataset();


await Actor.exit(); 