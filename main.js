'use strict';

async function fetchJSON(url) {
    const res = await fetch(url);
    return res.json();
}

async function postJSON(url, data) {
    const { status } = await fetch(url, {
        mode: 'same-origin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return status;
}

document.getElementById('product_add').addEventListener('click', async () => {
    const { value } = document.getElementById('product_name');
    const status = await postJSON('api/products', { name: value });
    console.log(status);
});

document.getElementById('product_get').addEventListener('click', async () => {
    const list = document.getElementById('product_list');
    const products = await fetchJSON('api/products');
    list.innerHTML = '';
    for (const product of products) {
        const p = document.createElement('p');
        p.textContent = product.name;
        list.append(p);
    }
});