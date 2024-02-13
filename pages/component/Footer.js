import React from 'react';

export default function Footer() {
  return (
    <div>
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
            <div className='flex justify-evenly'>
          <h3 className="text-xl font-bold mb-4">ติวเตอร์อาคารสมุทร</h3>
          </div>
          <div>
          <p className="text-sm">ที่อยู่: 123 ถนนสุขุมวิท, แขวงลาดพร้าว, เขตลาดพร้าว, กรุงเทพมหานคร 10210</p>
          <p className="text-sm">อีเมล: tutor@example.com</p>
          <p className="text-sm">โทร: 02-123-4567</p>
          </div>
        </div>
        <div>
        <div className='flex justify-evenly'>
          <h3 className="text-xl font-bold mb-4">ลิงก์ที่เกี่ยวข้อง</h3>
          </div>
          <ul className="list-none">
            <li><a href="/" className="hover:text-gray-300">หน้าหลัก</a></li>
            <li><a href="/about" className="hover:text-gray-300">เกี่ยวกับเรา</a></li>
            <li><a href="/services" className="hover:text-gray-300">บริการ</a></li>
            <li><a href="/contact" className="hover:text-gray-300">ติดต่อเรา</a></li>
          </ul>
        </div>
        <div>
        <div className='flex justify-evenly'>
          <h3 className="text-xl font-bold mb-4">ติดตามเรา</h3>
          </div>
          <ul className="list-none">
            <li><a href="https://www.facebook.com/tutor" className="hover:text-gray-300">Facebook</a></li>
            <li><a href="https://www.instagram.com/tutor" className="hover:text-gray-300">Instagram</a></li>
            <li><a href="https://twitter.com/tutor" className="hover:text-gray-300">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm">© 2024 ติวเตอร์อาคารสมุทร. สงวนสิทธิ์.</p>
      </div>
    </footer>
    </div>
  );
}
