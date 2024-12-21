describe('Rozetka Notebook Tests', () => {
  const notebookPageUrl = 'https://rozetka.com.ua/ua/notebooks/c80004/';
  const availabilityText = 'Готовий до відправлення';
  const notebookTitles = ['Acer', 'Lenovo'];

  beforeEach(() => {
    cy.visit(notebookPageUrl);  // Visit the notebook page
  });

  it('displays available notebooks and allows adding to cart', () => {
    // Check if the "ноутбуки" section is visible
    cy.contains('body', 'ноутбуки').should('be.visible');
    
    // Check if Acer and Lenovo notebooks are listed
    notebookTitles.forEach((brand) => {
      cy.get('.goods-tile__title').contains(brand).should('be.visible');
    });

    // Check availability status and that the item can be added to the cart
    cy.get('.goods-tile__availability')
      .should('contain.text', availabilityText)
      .and('be.visible');

    // Add the 1st notebook to the cart and check button state
    cy.scrollTo('top');
    
    // Increase timeout for waiting for element
    cy.get('.buy-button', { timeout: 10000 })
      .eq(0)
      .trigger('mouseover');
    
    cy.wait(3000);
    cy.get('.buy-button')
      .eq(0)
      .click({ force: true });
    cy.wait(3000);

    // Ensure that the item is added to the cart using a network request
    cy.request({
      method: 'POST',
      url: 'https://uss.rozetka.com.ua/session/cart-se/add',
      body: [{
        "goods_id": 460827374,
        "quantity": 1
    }],
      headers: {
        'cookie': 'cart-modal=old; promo-horizontal-filters=verticalFilters; social-auth=new; ab_tile_filter=old; _uss-csrf=f6L84NcuziDhjfg/lBop0Iwci7pDHMHz9Ew3oLFugRC2gqBF; ussapp=bNfCSolwbJOVmC100jZ02R1aLmksXWvn4qlT2ewr; xab_segment=16; _ga=GA1.3.586256153.1726736986; _gcl_au=1.1.795574490.1726736986; afclid=29603518811726736986; city_id=b205dde2-2e2e-4eb9-aef2-a67c82bbdf27; _fbp=fb.2.1726736986836.377644408263117889; __exponea_etc__=f0ec762f-1ce2-4640-b8a8-e211200e445f; _hjSessionUser_3494164=eyJpZCI6ImM5OGU0MjA2LTUzYTItNTkxOS1hMWFkLTRjMzMyODdmMDhkNCIsImNyZWF0ZWQiOjE3MjY3MzY5ODYyNTEsImV4aXN0aW5nIjp0cnVlfQ==; __utmz_gtm=utmcsr=google|utmccn=(none)|utmcmd=organic; __gads=ID=d7fb9d64d10ee7b0:T=1728228696:RT=1728228696:S=ALNI_Maxku2aCU4zyij2TUuyla8eUzE4_A; __gpi=UID=00000f28f8ef4445:T=1728228696:RT=1728228696:S=ALNI_MZMVPSnV34o2FN3H1OLXKRET_moYw; __eoi=ID=8b385d41886ecde0:T=1728228696:RT=1728228696:S=AA-AfjZJIJw7ascsaJIUHcLOAQV3; af_sources=[]; slang=ua; ab_test_search=1; uid=Cgo9D2dEy3+mcWMLs5WZAg==; ussajwt=eyJhbGciOiJSUzI1NiIsImtpZCI6InVzc2F0LnYwIiwidHlwIjoiSldUIn0.eyJkZXRhaWxzIjoiNGQzYzI3N2I5ZTEyZTYyNWU0ODA0YzVkYWIzNjVlYzViYTcyNDEzYmIxOGM4OWNmOGJjZGYxZTM0MzM0MjM4OWExZTRiMzM0NGNiODNkMzMwMmI5NTJmOGE4NWIyMzA1MDc3ZDYxNWRiMTE4YzI2MTVmNGFmM2RiM2E0NDhkZmE1YWE4MWJkOWVjMWViODJiMjkxYTNiYjMwNjU3ZjEzYzUyOTk5NjAzZDU5MWI2MTAzZDMyNjExYWU1NGY0NmU4NTg2Yjg4MjZkYzRiZDYzNWI1MDE1MDRlZmE5YWE2YjczNTg4ZGQ4YWI3YzAxYzYwY2E2ZjI3NTI4MzcwZjQxOCIsImV4cCI6IjE3MzQ0Njk5OTYiLCJ1c3NhdCI6IjE2MzcxM2U0MGJhMDllZWY4ZWViOTQ5MTI3NTIxNmU4LnVhLTZmN2UwZGJjMzIxZGE4MzM2NjlmMmQwMTczM2ZmNTY3LjE3MzQ0Njk5OTYifQ.nbaFT0QyUHzFCqyGD_jLmmE4_ejAr_xQwvkBtU-yIYq4hMSKMdGuq-xy_yzjHzALw1B1kM6pPosI-qsO71tSKtT1fLtEk3KaRjU_TWJdOPuvaj8TimbH1Lm6n4D-cKMKIK2q7Caj6T_JMYltuvMKtqDhHdNTYzxNzTAD51uYU7WCsHo8zXCjQwsTjbpVW5bkOf2v5AgvwSsZfeNw3wioGAW1Si2EUzgVhin4QkTR-qqc0ugORw3L0R9C7rt08OA5T6IH7u3wk46AdULMJOtXLUrj5ASPTxV6rwsh0MsFZ-aKy7YcfU3KpJtDdd16sYxs8n6hi0m2WQBXi2pTx8lvmw; ussat=163713e40ba09eef8eeb9491275216e8.ua-6f7e0dbc321da833669f2d01733ff567.1734469996; ussrt=8ff4535840158df165c371f1c60d41cb.ua-6f7e0dbc321da833669f2d01733ff567.1737018796; ussat_exp=1734469996; __cf_bm=.pnNyjEWTfzHUcJC0VO3j.W_SiD45lVju2qKJdQteuE-1734426796-1.0.1.1-ZRoT.3qxij0eu4eVFR7rMJ01w8PFSq1utByBhYUkzymGIXaF5CL.HV4Y9kfreddW45f6uN2bJQ7AmU8P.1YhLg; cf_clearance=kfR.QFfE0zlyGhGoD9YvkQdPqVPk41.XpL.dlv61AO0-1734426797-1.2.1.1-W1mVHjUSJ2XgLJYaNB1mJqMbtsHuFL_ubMXb4QSnmCUjv3A8tjucy7_jvg_98YTj048lQVkVqUU5qDihG73bKNT6_KKUzoWQIYD_3oq.zIyE5zWG9Vi93e_KykGXwrFLW4fWvr_Zd7rLadXor5qWxUNVjNNQZH7suqK5EDFaropEujXpTZU7EiNEZgK8O.d.55CB_1uMSdBKMOL9I4gkhrawJAOLIJPOycl919b4LmEedyHDD3HqYZcfDUpwYxXzB3jKSZkIPN_cqRiCpp2YLgtGnGzhNX0fvqBGfQPxYFj77iNItXxd9KATClFJ6eU6.Z8ts29pYNgeAyFrqKfCdBL6whsVtqXYC65GxBVkLpUoGxWxB8RVHLbITWOhpgrhbxJR7FLAgdznxz723P3w8Q; _hjSession_3494164=eyJpZCI6IjQ5OGJlZTQ2LWNmZWMtNDMyNS05MGM5LTJkYWQ5YjQ0OTU1MSIsImMiOjE3MzQ0MjY3OTc5MjAsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; __exponea_time2__=0.06109929084777832; cto_bundle=v2-L_V9rU0xiU2podmk1N3VPdUIwOXNZUGtmWVduclQ0VFlDWEYyTUZKVGhGMWdEVjNIckF3ajBlcTUlMkJRb2s4MTNSd1JqY2cwdEc4TWElMkZXUkV5M3lhRyUyRm5ONjZvN25kYnRVbjhMT1ViZzBVa2J6cHY1dG1ORU1FbmdoOHRWQUFrM0wlMkJUUkNhMkdyMXI4dW9WQTBVOFRvdWh2RWp2eFl5JTJGZWhKdU04bUFiayUyQllBQiUyQmVWZHFnJTJCTXFybHg4bG5LUElCTnRFZW5UaHJVTlZlNlZHdk9xdWloVHJvbEZpMDlxMXpmdHpMMWdPSFJDYWdHWTFibnltVlYyRlNLZ20yWmFveElhJTJGamducGtReiUyRkslMkIxT1U3ZHlSNE9sQmclM0QlM0Q; _ga_3X15VBC9L9=GS1.3.1734426798.22.1.1734426803.55.0.0',
        'csrf-token': 'f6L84NcuziDhjfg/lBop0Iwci7pDHMHz9Ew3oLFugRC2gqBF',
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false // Allow non-2xx responses for debugging
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure status is 200
      expect(response.body.cost).to.have.property('price', 42998); // Validate price
    });
  });

  it('waits for settings request and submits an order', () => {
    // Intercept the network request for getting settings
    cy.intercept('GET', 'https://rozetka.com.ua/cdn-cgi/rum').as('getSettings');
    cy.visit(notebookPageUrl);

    cy.wait('@getSettings').then((interception) => {
      cy.log('Intercepted Request:', interception.request);
      cy.log('Intercepted Response:', interception.response);
      expect(interception.response.statusCode).to.eq(200); 
    });

    // Add the first notebook to the cart
    cy.get('.goods-tile__inner', { timeout: 10000 }).should('be.visible')
      .first()
      .find('.buy-button')
      .click({ force: true });
  });

  it('verifies that an item is added to the cart and submits the order', () => {
    // Verify that the cart icon is updated and visible
    cy.get('rz-icon-badge')
      .should('have.attr', 'rz-icon-badge')
      .and('be.visible')
      .wait(4000);

    // Click the "Оформити замовлення" (Submit Order) button
    cy.contains('Оформити замовлення')
      .trigger('mouseover')
      .click();

    // Submit the order by clicking the "Submit Order" button
    cy.get('.cart-footer')
      .find('a[data-testid="cart-receipt-submit-order"]')
      .click();
  });
});