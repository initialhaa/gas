const productData = [
    {
        id: 1,
        name: "LPG Pertamina Gas 5.5 kg",
        weight: "5,5 kg",
        desc: "Untuk kebutuhan rumah tangga dan usaha kecil.",
        // price: "Rp 100.000",
        image: "5.5kg.jpg"
    },
    {
        id: 2,
        name: "LPG Pertamina Gas 12 kg",
        weight: "12 kg",
        desc: "Ukuran medium untuk rumah tangga dan usaha kuliner.",
        // price: "Rp 155.000",
        image: "12kg.jpg"
    },
    {
        id: 3,
        name: "LPG Pertamina 50 kg",
        weight: "50 kg",
        desc: "Untuk kebutuhan industri dan usaha skala besar.",
        // price: "Rp 620.000",
        image: "50kg.jpg"
    }
];

        // Render produk ke grid
function renderProductGrid(containerId, filterWeights = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let productsToShow = [...productData];

    if (filterWeights && Array.isArray(filterWeights)) {
        productsToShow = productsToShow.filter(
            p => filterWeights.includes(p.weight)
        );
    }

    if (productsToShow.length === 0) {
        container.innerHTML =
            '<p style="text-align:center;">Belum ada produk tersedia.</p>';
        return;
    }

    let html = '';

    productsToShow.forEach(prod => {
        html += `
            <div class="product-card">
                <div class="product-img">
                    <img src="${prod.image}" alt="${prod.name}">
                </div>

                <div class="product-info">
                    <h4>${prod.name}</h4>

                    <div class="product-weight">
                        Berat: ${prod.weight}
                    </div>

                    <p class="product-desc">
                        ${prod.desc}
                    </p>

                    

                    <button
                        class="btn-order"
                        data-product="${prod.name} (${prod.weight})">
                        <i class="fab fa-whatsapp"></i>
                        Pesan Sekarang
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Tombol order WhatsApp
    document.querySelectorAll('.btn-order').forEach(btn => {
        btn.addEventListener('click', () => {

            const productName =
                btn.getAttribute('data-product') || 'Produk';

            const waNumber = '6285711177712';

            const message = encodeURIComponent(
`Halo PT. Jonggol Berkah Energi,

Saya ingin memesan produk berikut:
${productName}
Mohon informasi mengenai:
- Ketersediaan stok
- Harga terbaru
- Metode pembayaran

Terima kasih.`
            );

            window.open(
                `https://wa.me/${waNumber}?text=${message}`,
                '_blank'
            );
        });
    });
}

        // Navigasi halaman
        function setupNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            const pages = ['beranda', 'produk', 'tentang', 'kontak'];
            
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = link.getAttribute('data-page');
                    
                    // Sembunyikan semua halaman
                    pages.forEach(p => {
                        const pageDiv = document.getElementById(`${p}-page`);
                        if (pageDiv) pageDiv.classList.remove('active-page');
                    });
                    
                    // Tampilkan halaman yang dipilih
                    const activePage = document.getElementById(`${page}-page`);
                    if (activePage) activePage.classList.add('active-page');
                    
                    // Update active class pada nav
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Update breadcrumb
                    const breadcrumbSpan = document.getElementById('breadcrumb-page');
                    const pageTitles = {
                        beranda: 'Beranda',
                        produk: 'Produk',
                        tentang: 'Tentang Kami',
                        kontak: 'Kontak Kami'
                    };
                    breadcrumbSpan.innerText = pageTitles[page] || 'Beranda';
                    
                    // Render ulang produk jika perlu
                    if (page === 'beranda') {
                        renderProductGrid('product-grid-beranda', ['5,5 kg', '12 kg', '50 kg']);
                    } else if (page === 'produk') {
                        renderProductGrid('product-grid-catalog', null);
                    } else if (page === 'kontak') {
                        setTimeout(initMap, 200);
                    }
                    
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            });
            
            // Breadcrumb home
            const breadcrumbHome = document.getElementById('breadcrumb-home');
            if (breadcrumbHome) {
                breadcrumbHome.addEventListener('click', () => {
                    document.getElementById('beranda-page').classList.add('active-page');
                    document.getElementById('produk-page').classList.remove('active-page');
                    document.getElementById('tentang-page').classList.remove('active-page');
                    document.getElementById('kontak-page').classList.remove('active-page');
                    
                    navLinks.forEach(l => l.classList.remove('active'));
                    document.querySelector('.nav-link[data-page="beranda"]').classList.add('active');
                    document.getElementById('breadcrumb-page').innerText = 'Beranda';
                    renderProductGrid('product-grid-beranda', ['5,5 kg', '12 kg', '50 kg']);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        }

        // Setup action icons
        function setupActionIcons() {
            const chatIcon = document.querySelector('.action-chat');
            const wishlistIcon = document.querySelector('.action-wishlist');
            const shareIcon = document.querySelector('.action-share');
            const searchIcon = document.querySelector('.search-icon');
            
            if (chatIcon) {
                chatIcon.addEventListener('click', () => alert('💬 Hubungi CS kami via WhatsApp: 0813-1093-6835'));
            }
            if (wishlistIcon) {
                wishlistIcon.addEventListener('click', () => alert('❤️ Fitur Wishlist akan segera hadir!'));
            }
            if (shareIcon) {
                shareIcon.addEventListener('click', () => {
                    if (navigator.share) {
                        navigator.share({ title: 'PT. Jonggol Berkah Energi', url: window.location.href });
                    } else {
                        alert('🔗 Bagikan link website ini');
                    }
                });
            }
            // if (searchIcon) {
            //     searchIcon.addEventListener('click', () => {
            //         alert('🔍 Cari produk LPG: 5,5kg, 12kg, dan 50kg. Hubungi kami untuk info stok terbaru.');
            //     });
            // }
        }

        // Inisialisasi peta (Leaflet)
        function initMap() {
            const mapContainer = document.getElementById('google-map');
            if (!mapContainer || mapContainer._mapInitialized) return;
            
            const lat = -6.4672;
            const lng = 107.0333;
            const map = L.map('google-map').setView([lat, lng], 15);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(map);
            L.marker([lat, lng]).addTo(map).bindPopup("<b>PT. Jonggol Berkah Energi</b><br>Jl. Raya Jonggol KM 35, Bogor").openPopup();
            mapContainer._mapInitialized = true;
        }

        // Setup contact form
        function setupContactForm() {
            const form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const name = document.getElementById('contact-name')?.value || '';
                    const contact = document.getElementById('contact-contact')?.value || '';
                    const subject = document.getElementById('contact-subject')?.value || '';
                    const message = document.getElementById('contact-message')?.value || '';
                    
                    const waMessage = `Halo PT. Jonggol Berkah Energi%0A%0ANama: ${name}%0AKontak: ${contact}%0ASubjek: ${subject}%0APesan: ${message}`;
                    window.open(`https://wa.me/6281310936835?text=${waMessage}`, '_blank');
                    alert('Pesan akan dikirim via WhatsApp. Terima kasih!');
                    form.reset();
                });
            }
        }

        // Inisialisasi saat halaman dimuat
        document.addEventListener('DOMContentLoaded', () => {
            renderProductGrid('product-grid-beranda', ['5,5 kg', '12 kg', '50 kg']);
            renderProductGrid('product-grid-catalog', null);
            setupNavigation();
            setupActionIcons();
            setupContactForm();
            setTimeout(initMap, 300);
        });