'use strict';

async function req(arg1, arg2, arg3) {
    //     // req('path') GET
    //     // req('method', 'path') arg1
    //     // req('path', {data}) POST
    //     // req('method', 'path', {data}) arg1
    const res = await fetch((typeof arg2 === 'string' ? arg2 : arg1), {
        mode: 'same-origin',
        method: (typeof arg2 === 'string' ? arg1 : (typeof arg2 === 'undefined' ? 'GET' : 'POST')),
        headers: { 'Content-Type': 'application/json' },
        body: (typeof arg2 === 'object' ? JSON.stringify(arg2) : JSON.stringify(arg3))
    });
    try {
        return { status: res.status, res: await res.json() };
    } catch (e) {
        return { status: res.status , res: null};
    }
}

document.getElementById('product_add').addEventListener('click', async () => {
    const { value } = document.getElementById('product_name');
    const { status } = await req('api/products', { name: value });
    console.log(status);
});

document.getElementById('product_get').addEventListener('click', async () => {
    const list = document.getElementById('product_list');
    const { res } = await req('api/products');
    list.innerHTML = '';
    for (const product of res) {
        const p = document.createElement('p');
        p.textContent = product.name;
        list.append(p);
    }
});