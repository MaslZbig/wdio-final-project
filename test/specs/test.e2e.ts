import { expect, browser, $ } from '@wdio/globals'

//     Test 1 
describe('Verify login with valid credentials', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://practicesoftwaretesting.com/auth/login`)

        await $('#email').setValue('customer@practicesoftwaretesting.com')
        await $('#password').setValue('welcome01')
        const button = await $('[type=submit]')
        await button.click();

        await expect(browser).toHaveUrl(`https://practicesoftwaretesting.com/account`)

        const pageTitle = await $('My account')
        await expect(pageTitle).toBeDisplayed

        const navMenu = await $('Jane Doe')
        await expect(navMenu).toHaveText
    })
})

//     Test 2
describe('Verify user can view product details', () => {
    it('should verify product details for "Combination Pliers"', async () => {
        await browser.url(`https://practicesoftwaretesting.com`)

        const product = $(`//*[contains(text(), 'Combination Pliers')]`)
        await product.click()
        
        const currentUrl = await browser.getUrl()
        expect(currentUrl).toContain('https://practicesoftwaretesting.com/product')

        const productNameElement = $('[data-test="product-name"]')
        await productNameElement.waitForDisplayed();
        const productName = await productNameElement.getText()
        expect(productName).toBe("Combination Pliers")

        const productPrice = await $('aria/unit-price')
        await expect(productPrice).toHaveText('14.15')

        const addToCartButton = $('[data-test="add-to-cart"]')
        const isVisible = await addToCartButton.isDisplayed()
        expect(isVisible).toBe(true)

        const addToFavoritesButton = $ ('[data-test="add-to-favorites"]')
        const visible = await addToFavoritesButton.isDisplayed()
        expect(visible).toBe(true)
    })
})

//     Test 3
describe('Verify user can add product to cart', () => {
    it.only('Add "Slip Joint Pliers" to cart and check price and quantity', async () => {
        await browser.url(`https://practicesoftwaretesting.com`)

        const product = $(`//*[contains(text(), 'Slip Joint Pliers')]`)
        await product.click()

        const currentUrl = await browser.getUrl()
        expect(currentUrl).toContain('https://practicesoftwaretesting.com/product')

        const productPrice = await $('aria/unit-price')
        await expect(productPrice).toHaveText('9.17')

        const addToCartButton = $('[data-test="add-to-cart"]')
        await addToCartButton.click()
        
        const notification = $('[role="alert"]')
        await notification.waitForDisplayed({ timeout: 8000 })

        const cartQuantity = $('#lblCartCount')
        await cartQuantity.waitForDisplayed()
        const quantity = await cartQuantity.getText()
        expect(quantity).toBe("1")
        

        const cartButton = $('[data-test="nav-cart"]')
        console.log('cartButton');
        await cartButton.click()
        console.log('cartButton click');
        

        const cartUrl = await browser.getUrl()
        expect(cartUrl).toContain('https://practicesoftwaretesting.com/checkout')

        const productQuantity = $('[data-test="product-quantity]')
        await productQuantity.waitForDisplayed()
        const quantityValue = await productQuantity.getText()
        expect(quantityValue).toBe("1")
 
    })
})
