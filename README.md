# 🏢 Global Business Marketplace Scraper  

Automate your research on **GlobalBizM.com** with this simple scraper. Perfect for **investors and analysts** looking for business opportunities. Select a **country and sector** to find companies for sale, run it, and get organized results in minutes, no programming skills required.

---

## ⚡ Why use this crawler?

- **Save hours of manual research**: Get accurate data from hundreds of listings in minutes.
- **Fully automated pagination**: Crawl all pages without intervention.
- **Flexible item limits**: Control exactly how many listings to extract.

---

## 📋 Features

- **PlaywrightCrawler**: navigates pages and extracts business IDs from listings.  
- **API data fetching**: uses `fetch` to get full business details from GlobalBizM API.  
- **Automatic pagination**: goes through all listing pages automatically.  
- **Resource blocking**: skips images and stylesheets to speed up navigation.   
- **Configurable input**: set `startUrls`, `maxItems`, `country`, and `industry`.  

---

## 🔍 Data Extracted  

Each business registration includes:

- Listing URL  
- Business title  
- Category / Industry  
- Asking Price
- Revenue and Cash Flow  
- Location (City, State, Country)  
- Primary Image URL 
- Established Year
- Currency
- Short Description  
- Contact information (name, email, phone)  
- Selling Reason  

---

## ⚙️ Input Parameters  

```json
{
  "maxItems": 100,
  "country": "Select Country",
  "industry": "All industries"
}
```

## 📤 Output
```json
{
	"url": "https://globalbizm.com/business/business-details?businessId=51782",
	"title": "Consistently Profitable Home Healthcare Agency",
	"PrimaryImage": "https://gbm-prod.fra1.digitaloceanspaces.com/business/e9b71117-bcc9-4daf-acb9-b77086b61225.jpeg",
	"description": "This established well-established home healthcare agency is a great opportunity for someone to get started in this high growth industry or for an existing agency to expand market share and services. Seller is looking for the best fit and is extremely...",
	"category": "Health and Medical",
	"askingPrice": 325000,
	"grossRevenue": 1325140,
	"cashFlow": 153587,
	"currency": "USD",
	"establishedYear": 2012,
	"city": "Undisclosed",
	"state": "Michigan",
	"country": "United States",
	"contactName": "Undisclosed",
	"contactEmail": "brad@abb-businessbrokers.com",
	"contactPhone": "2699038143",
	"sellingReason": "• This business was a part of an acquisition, and the company is looking for a good fit transition as this business is outside their core offerings • Seller wants to find the best fit to continue quality service to the clients, community and employees"
}
```