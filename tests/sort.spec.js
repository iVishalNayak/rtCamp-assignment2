const { test, expect } = require('@playwright/test');

test('Verify price sorting - Low to High', async ({ page }) => {
    // Enable console logs for debugging
    page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));

    // Log network requests
    page.on('request', request => console.log(`Request: ${request.method()} - ${request.url()}`));

    // Step 1: Navigate to the SauceDemo inventory page
    console.log('Navigating to inventory page...');
    await page.goto('https://www.saucedemo.com/v1/inventory.html');

    // Step 2: Locate the sorting dropdown
    console.log('Locating sorting dropdown...');
    const sortingDropdown = page.locator('select.product_sort_container');

    // Step 3: Select "Price (Low to High)"
    console.log('Selecting sorting option: Price (Low to High)...');
    await page.waitForTimeout(3000);
    await sortingDropdown.selectOption('lohi'); // Correct value for sorting

    await page.waitForTimeout(2000); // Wait for sorting to apply

    // Step 4: Capture all product prices and verify sorting order
    console.log('Capturing product prices...');
    const priceElements = await page.locator('.inventory_item_price').allTextContents();
    
    // Convert prices from "$" format to numbers 
    const prices = priceElements.map(price => parseFloat(price.replace('$', '')));

    console.log(' Extracted Prices:', prices);

    // Verify the prices are sorted in ascending order
    const sortedPrices = [...prices].sort((a, b) => a - b); // Sorted for comparison
    console.log(' Expected Sorted Prices:', sortedPrices);
    
    expect(prices).toEqual(sortedPrices); // Assertion to check sorting

    console.log(' Prices are sorted correctly from Low to High.');
});
