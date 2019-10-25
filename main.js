'use strict';

async function req(arg1, arg2, arg3) {
    // req('path')
    // req('method', 'path')
    // req('path', {data})
    // req('method', 'path', {data})
    let method, path, data;
    if (typeof arg2 === 'undefined') {
        path = arg1;
    } else if (typeof arg3 === 'undefined') {
        if (typeof arg2 === 'string') {
            method = arg1;
            path = arg2;
        } else {
            method = 'POST';
            path = arg1;
            data = JSON.stringify(arg2);
        }
    } else {
        method = arg1;
        path = arg2;
        data = JSON.stringify(arg3);
    }
    const res = await fetch(path, {
        mode: 'same-origin',
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: data
    });
    return { status: res.status, res: await res.json() };
}

async function req(arg1, arg2, arg3) {
    // req('path')
    // req('method', 'path')
    // req('path', {data})
    // req('method', 'path', {data})
    let method, path, data, res;
    if (typeof arg2 === 'undefined') {
        res = await fetch(arg1);
    } else if (typeof arg3 === 'undefined') {
        if (typeof arg2 === 'string') {
            res = await fetch(arg2, { method: arg1 })
        } else {
            res = await fetch(arg1, {
                mode: 'same-origin',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arg2)
            });
        }
    } else {
        res = await fetch(arg2, {
            mode: 'same-origin',
            method: arg1,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(arg3)
        });
    }
    return { status: res.status, res: await res.json() };
}

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
    return { status: res.status, res: await res.json() };
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