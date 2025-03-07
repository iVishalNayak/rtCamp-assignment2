const { test, expect } = require('@playwright/test');

test('Verify price sorting - Low to High', async ({ page }) => {
    // Step 1: Navigate to the SauceDemo inventory page
    await page.goto('https://www.saucedemo.com/v1/inventory.html');

    const sortingDropdown = page.locator('select.product_sort_container');

    //  Select "Price (Low to High)"
    await page.waitForTimeout(3000);
    await sortingDropdown.selectOption('lohi'); // Correct value for sorting

    await page.waitForTimeout(2000); // Wait for sorting to apply

    // : Capture all product prices and verify sorting order
    const priceElements = await page.locator('.inventory_item_price').allTextContents();
    
    // Convert prices from "$" format to numbers 
    const prices = priceElements.map(price => parseFloat(price.replace('$', '')));

    // Verify the prices are sorted in ascending order
    const sortedPrices = [...prices].sort((a, b) => a - b); // Sorted for comparison
    expect(prices).toEqual(sortedPrices); // Assertion to check sorting

    console.log('✅ Prices are sorted correctly from Low to High:', prices);
});
