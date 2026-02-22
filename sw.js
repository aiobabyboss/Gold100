const CACHE_NAME = 'shwe-myat-nha-v2';

// ပုံ ၁၀၀ လုံးရဲ့ နာမည်တွေကို အလိုအလျောက် generate လုပ်မယ်
const imageAssets = [];
for (let i = 1; i <= 100; i++) {
    imageAssets.push(`./${i}.png`);
    imageAssets.push(`./${i}.PNG`); // Case sensitivity အတွက် နှစ်မျိုးလုံးထည့်ထားပါတယ်
}

const assetsToCache = [
    './',
    './index.html',
    ...imageAssets
];

// ဖိုင်များကို စတင် Cache သိမ်းဆည်းခြင်း
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching assets...');
            return cache.addAll(assetsToCache);
        })
    );
});

// Offline ဖြစ်နေချိန်တွင် Cache ထဲမှ ဖိုင်များကို ပြန်ထုတ်ပေးခြင်း
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

