const { test, expect } = require('@playwright/test');
const postRequest = require('../test-data/post.json');

test('Post api request using JSON file in playwright', async({ request })=>{
    
    // create post api request using playwright
    const postResponse = await request.post('/booking',{
        data:postRequest
    })

    // validate status code 
    console.log(await postResponse.json());

    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(200);

    // validate api response json obj
    const postResponseBody = await postResponse.json();

    expect(postResponseBody.booking).toHaveProperty("firstname","testers talk");
    expect(postResponseBody.booking).toHaveProperty("lastname","tutorial");

    // validate api response nested json obj
    expect(postResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
    expect(postResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");
})