// ============================================================
// Hotel Amy — Mock Data
// Chỉnh sửa file này để cập nhật nội dung mà không cần đụng UI
// ============================================================

// --- Interfaces ---
export interface RoomAmenity {
  icon: string
  label: string
}

export interface Room {
  id: number
  slug: string
  name: string
  description: string
  image: string
  priceFrom: number
  amenities: RoomAmenity[]
  highlight?: string
  zaloLink: string
}

export interface Amenity {
  id: number
  icon: string
  title: string
  description: string
}

export interface NearbyPlace {
  id: number
  name: string
  distance: string
  icon: string
}

export interface ContactInfo {
  address: string
  hotline: string
  zaloNumber: string
  zaloLink: string
  facebookLink: string
  facebookName: string
  email: string
  mapEmbedSrc: string
  openHours: string
}

// --- Contact Information ---
export const contactInfo: ContactInfo = {
  address: '50/5 Đường Gò Dầu, Phường Tân Sơn Nhì, Quận Tân Phú, TP. Hồ Chí Minh',
  hotline: '0908 068 466',
  zaloNumber: '0908068466',
  zaloLink: 'https://zalo.me/0908068466',
  facebookLink: 'https://facebook.com/hotelamysg',
  facebookName: 'Hotel Amy Sài Gòn',
  email: 'hotelamysg@gmail.com',
  mapEmbedSrc: 'https://maps.google.com/maps?q=50%2F5%20g%C3%B2%20d%E1%BA%A7u%2C%20T%C3%A2n%20Ph%C3%BA%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=16&ie=UTF8&iwloc=&output=embed',
  openHours: 'Check-in: 14:00 | Check-out: 12:00 | Lễ tân: 24/7',
}

// --- Room Data ---
export const rooms: Room[] = [
  {
    id: 1,
    slug: 'don',
    name: 'Phòng Đơn',
    description: 'Phòng 1 giường thoải mái, sạch sẽ. Thích hợp cho cá nhân lưu trú ngắn hạn với mức giá phải chăng.',
    image: '/images/room-standard.jpg',
    priceFrom: 230,
    highlight: 'Tiết kiệm nhất',
    zaloLink: 'https://zalo.me/0908068466',
    amenities: [
      { icon: 'fi fi-rr-bed', label: '1 Giường đôi' },
      { icon: 'fi fi-rr-shower', label: 'NVS Riêng' },
      { icon: 'fi fi-rr-wifi', label: 'Free WiFi' },
      { icon: 'fi fi-rr-bottle', label: 'Nước suối' },
    ],
  },
  {
    id: 2,
    slug: 'doi',
    name: 'Phòng Đôi',
    description: 'Phòng 2 giường rộng rãi, thích hợp cho nhóm hoặc gia đình nhỏ. Không gian thoáng đãng, yên tĩnh, đầy đủ tiện nghi.',
    image: '/images/room-deluxe.jpg',
    priceFrom: 400,
    highlight: 'Phổ biến nhất',
    zaloLink: 'https://zalo.me/0908068466',
    amenities: [
      { icon: 'fi fi-rr-bed', label: '2 Giường đôi' },
      { icon: 'fi fi-rr-shower', label: 'NVS Riêng' },
      { icon: 'fi fi-rr-wifi', label: 'Free WiFi' },
      { icon: 'fi fi-rr-bottle', label: 'Nước suối' },
    ],
  },
  {
    id: 3,
    slug: 'vip',
    name: 'Phòng VIP',
    description: 'Phòng rộng nhất, trang bị đầy đủ tiện nghi, view đẹp, thoáng mát. Mức giá cực kỳ phải chăng cho trải nghiệm lưu trú tốt nhất.',
    image: '/images/room-suite.jpg',
    priceFrom: 400,
    highlight: 'Đầy đủ tiện nghi',
    zaloLink: 'https://zalo.me/0908068466',
    amenities: [
      { icon: 'fi fi-rr-bed', label: 'Giường Tròn' },
      { icon: 'fi fi-rr-shower', label: 'NVS Tiện nghi' },
      { icon: 'fi fi-rr-wifi', label: 'Free WiFi' },
      { icon: 'fi fi-rr-bottle', label: 'Nước suối' },
    ],
  },
]

// --- Amenities Data ---
export const amenities: Amenity[] = [
  {
    id: 1,
    icon: 'fi fi-rr-parking',
    title: 'Bãi đỗ xe an toàn',
    description: 'Camera 24/7, có chỗ cho xe máy & ô tô',
  },
  {
    id: 2,
    icon: 'fi fi-rr-wifi',
    title: 'Free WiFi tốc độ cao',
    description: 'Phủ sóng toàn bộ phòng nghỉ và khuôn viên',
  },
  {
    id: 3,
    icon: 'fi fi-rr-shower',
    title: 'NVS Tiện Nghi',
    description: 'Nhà vệ sinh sạch sẽ, riêng biệt từng phòng',
  },
  {
    id: 4,
    icon: 'fi fi-rr-broom',
    title: 'Dọn phòng sạch sẽ',
    description: 'Phòng ốc được dọn dẹp thường xuyên, thay ga gối sạch',
  },
  {
    id: 5,
    icon: 'fi fi-rr-shirt',
    title: 'Dịch vụ giặt giũ',
    description: 'Có hỗ trợ giặt sấy đồ cho khách lưu trú',
  },
  {
    id: 6,
    icon: 'fi fi-rr-bottle',
    title: 'Nước giải khát',
    description: 'Phục vụ nước uống, nước ngọt các loại tại quầy',
  },
]

// --- Nearby Places ---
export const nearbyPlaces: NearbyPlace[] = [
  { id: 1, icon: 'fi fi-rr-moon', name: 'Chợ đêm Tân Bình', distance: '5 phút xe máy' },
  { id: 2, icon: 'fi fi-rr-tree', name: 'Công viên Hoàng Văn Thụ', distance: '10 phút xe máy' },
  { id: 3, icon: 'fi fi-rr-plane', name: 'Sân bay Tân Sơn Nhất', distance: '10 phút xe máy' },
  { id: 4, icon: 'fi fi-rr-restaurant', name: 'Phố ẩm thực Gò Dầu', distance: '2 phút đi bộ' },
  { id: 5, icon: 'fi fi-rr-hospital', name: 'Bệnh viện Tân Phú', distance: '8 phút xe máy' },
  { id: 6, icon: 'fi fi-rr-shopping-cart', name: 'Aeon Mall Tân Phú', distance: '5 phút đi xe' },
]

// --- About Section Content ---
export const aboutContent = {
  heading: 'Câu chuyện của Hotel Amy',
  body: [
    'Hotel Amy là mô hình kinh doanh lưu trú hộ gia đình, mang đến sự thân thiện, bình dân và gần gũi cho mọi khách hàng. Dù bạn cần một chỗ ngả lưng nghỉ ngơi hay lưu trú qua đêm, chúng tôi luôn có mức giá phù hợp nhất.',
    'Chỉ từ 230k/ngày, bạn sẽ có một căn phòng sạch sẽ, wifi vù vù, dọn phòng cẩn thận và dịch vụ chân thành như người nhà.',
  ],
  highlights: [
    { icon: 'fi fi-rr-star', value: '4.9/5', label: 'Mức độ hài lòng' },
    { icon: 'fi fi-rr-wallet', value: '230k', label: 'Giá chỉ từ (ngày)' },
    { icon: 'fi fi-rr-heart', value: '99%', label: 'Khách quay lại' },
  ],
}
