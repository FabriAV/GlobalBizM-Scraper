# 🏢 Global Business Marketplace Scraper  

Automate your research on **GlobalBizM.com** with this simple scraper. Perfect for **investors and analysts** looking for business opportunities. Select a **country and sector** to find companies for sale, run it, and get organized results in minutes, no programming skills required.

---

## ⚡ Why use this crawler?

### 📊 Complete Business Data (15+ Fields)
- **Business Essentials**: Title, description, industry category, established year
- **Financial Metrics**: Asking price, gross revenue, cash flow, currency
- **Location Details**: City, state, country information
- **Contact Information**: Broker name, email, phone number
- **Additional Insights**: Selling reason, primary business image, listing URL
- **Timestamps**: Date and time of extraction of each commercial record

### 🔍 Smart Filtering Features
- **Geographic Segmentation**: Focus on specific countries and regions
- **Industry Focus**: Target specific business sectors and categories
- **Volume Control**: Control exactly how much business you want to extract

### 📊 Data Applications

**Financial Analysis**: Evaluate selling prices based on revenue and cash flow metrics.
**Geographic Insights**: Identify markets and regions with high opportunity.
**Industry Trends**: Track industry-specific pricing and availability.

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
	"url": "https://globalbizm.com/business/business-details?businessId=51786",
	"title": "Natural Pet supply & Canine Rehab center",
	"PrimaryImage": "https://gbm-prod.fra1.digitaloceanspaces.com/business/1d253cee-2270-4ba6-a1f9-8a1474fe37cd.jpg",
	"description": "Available for acquisition is a natural pet retail store and canine rehabilitation center offering a curated selection of natural pet foods, treats, supplements, grooming products, and accessories for both dogs and cats, with an emphasis on biological...",
	"category": "Pet Services",
	"askingPrice": 195000,
	"grossRevenue": 442646,
	"cashFlow": 133341,
	"currency": "USD",
	"establishedYear": 2015,
	"city": "Atlanta",
	"state": "Georgia",
	"country": "United States",
	"contactName": "Undisclosed",
	"contactEmail": "info@sbgbrokers.com",
	"contactPhone": "7708144466",
	"sellingReason": "Relocating out of state",
	"scrapedTimestamp": "2025-10-28T17:57:42.894Z"
}
```

---

## 🛠️ Technical Details

- **Technology**: Node.js, Crawlee, PlaywrightCrawler, JavaScript
- **Data Source**: Direct API integration with GlobalBizM backend
- **Browser**: Navigation via Playwright
- **Performance Optimization**: Resource blocking (images, stylesheets) for faster execution
- **Pagination**: Automatic pagination for unlimited data collection
- **Dual-phase process**: page navigation + API fetching
- **Configuration**: Flexible input parameters (maxItems, country, industry)
