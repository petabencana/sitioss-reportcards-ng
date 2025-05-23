import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DeckService } from '../../services/cards/deck.service';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-donation-review',
  templateUrl: './report-donation-review.component.html',
  styleUrls: ['./report-donation-review.component.scss'],
})
export class ReportDonationReviewComponent implements OnInit {
  previewImg: HTMLImageElement;
  previewImgContainer: HTMLDivElement;
  address: any ;
  userDonate: number;
  termscontents = [
    {
      'tab_key': 'u_a',
      'tab_name': 'terms.userAgreement',
      'tab_content_en': '<p class="header">PetaBencana.id User Agreement</p><p>This agreement governs your access to and use of PetaBencana.id and the information and content on and functionality of the PetaBencana.id site. By using PetaBencana.id or contributing any information text, link, graphics, photos, videos or other materials (Content) to PetaBencana.id, you agree to be bound by this agreement. <p class="header">1. About PetaBencana.id</p><p>1.1 PetaBencana.id is a project of Yayasan Peta Bencana (YPB) and is operated in collaboration with the Pacific Disaster Centre (PDC) and Badan Nasional Penanggulangan Bencana (BNPB). YPB, PDC and BNPB are collectively referred to herein as “we” or “us.” PetaBencana.id is supported by USAID. <p>1.2 PetaBencana.id collects Flood Reports from users and Indonesian government agencies to map flooding. The aim of PetaBencana.id is to provide and share the best information on the locations of flooding in real-time to help residents and decision makers better respond to floods. <p>1.3 While that is our aim, the Content on PetaBencana.id may not be reliable. We trust contributors to provide complete and accurate information, but cannot represent or guarantee the completeness, accuracy or reliability of the Content posted on PetaBencana.id. We do not take actions to confirm the accuracy of Flood Report Content. Any use or reliance on Content on the locations of flooding on PetaBencana.id, therefore, is at your own risk. <p class="header">2. Flood Reports</p><p>2.1 You may report a flood via a PetaBencana.id Flood Report Card. Report Cards can be requested by asking the PetaBencana.id Automated Program "Bot" for a one-time-link via social messaging. Flood Reports submitted by you through PetaBencana.id are added to the publicly available map at <a href=https://petabencana.id/map>https://petabencana.id/map</a>. <p>2.2 Flood Reports may include the following data, which are shared publicly: <ul> <li>Your location at the time of report <li>Social messaging account username or user identification number</ul> <p>2.3 PetaBencana.id may at any time and for any reason reject or remove any Flood Report from the PetaBencana.id site. <p class="header">3. Flood Report Content</p><p>3.1 You are solely responsible for any Content you provide to PetaBencana.id. You must never add Content owned by someone else, including photos, without explicit permission from the copyright holder. By submitting a Flood Report, you represent that you have all rights, licenses, consents and permissions necessary to submit the Content of the Flood Report and to grant and authorize us to grant the licenses described below. <p>3.2 We do not claim ownership of the Content you submit in a Flood Report, but by submitting a Flood Report, you grant us a worldwide, royalty-free, non-exclusive, perpetual, irrevocable license to use, distribute and display your Flood Report and the Content included in the Flood Report and to sublicense your Flood Report and its Content under the Creative Commons Attribution 4.0 International License (For more details see the license at <a href=https://creativecommons.org/licenses/by/4.0/>https://creativecommons.org/licenses/by/4.0/</a>). This means that others will be able to copy and use the Content of your Flood Report. <p class="header">4. Other Copyright and License Matters</p><p>4.1 PetaBencana.id is supported by Open Source Software and is provided without warranty. For more details, see the project license documentation <a href=https://github.com/petabencana/petabencana-meta/blob/master/petabencana.id/LICENSING.md>https://github.com/petabencana/petabencana-meta/blob/master/petabencana.id/LICENSING.md</a> <p>4.2 Content on PetaBencana.id is licensed under the Creative Commons Attribution 4.0 International License. <p>4.3 If you believe that copyrighted material has been inappropriately added to PetaBencana.id, please contact our designated copyright agent at <a href=mailto:privacy@petabencana.id>privacy@petabencana.id</a> or Yayasan Peta Bencana, Jl. Sumbing No.17, Guntur, Jakarta Selatan 12980, Indonesia. Notification must include: <ul> <li>Identification of the copyrighted material. <li>Identification of the material that is claimed to be infringed, including sufficient information for us to locate the material (e.g., URL, IP address, computer name). <li>Your contact information (e.g., email address, phone number). <li>A statement that you believe use of the material has not been authorized by the copyright owner or an authorized agent. <li>A statement that the information in your notification is accurate and that you are or are authorized to act on behalf of the copyright owner.</ul> <p class="header">5. Data Privacy</p><p>We respect your privacy. For information about the data we collect and how we use and protect your data, please see our Privacy Policy. <p class="header">6. Disclaimer; Limitation of Liability</p><p>6.1 PETABENCANA.ID AND ANY INFORMATION, CONTENT OR SERVICES MADE AVAILABLE ON OR THROUGH PETABENCANA.ID ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS AND WE DISCLAIM ALL WARRANTIES OF ANY KIND (EXPRESS, IMPLIED OR OTHERWISE), INCLUDING, WITHOUT LIMITATION, ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT AND ANY WARRANTY THAT THE SITE WILL OPERATE IN AN UNINTERRUPTED OR ERROR-FREE MANNER OR BE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, EXCEPT INSOFAR AS ANY SUCH WARRANTIES MAY NOT BE DISCLAIMED UNDER APPLICABLE LAW.</p><p class="header">6.2 EXCEPT TO THE EXTENT PROHIBITED by applicable law, we are not liable for, and expressly DISCLAIM, all liability for loss, INJURY or damage caused by use of PetaBencana.id and the Content on the site. This exclusion of liability includes, but is not limited to, any special, incidental, consequential, punitive or exemplary damages, such as loss of revenue, data, anticipated revenue, HOWEVER AND WHENEVER CAUSED. This exclusion applies even if the Licensor knows or should know of the possibility of such damages.</p><p class="header">6.3 If liability may not be excluded by law, each of our liability is limited to actual and direct financial loss conclusively found to have been caused by our own negligence.</p><p class="header">7. Indemnification</p><p>You agree to defend, hold harmless and indemnify each of us, and our respective subsidiaries, affiliates, officials, officers, faculty, students, fellows, governing board members, agents and employees from and against any third-party claims, actions or demands arising out of, resulting from or in any way related to your use of PetaBencana.id, including any liability or expense arising from any and all claims, losses, damages (actual and consequential), suits, judgments, litigation costs and attorneys" fees, of every kind and nature. In such a case, one of us will provide you with written notice of such claim, suit or action.<b></p><p class="header">8. Miscellaneous</p><p>8.1 This Agreement will be governed by and construed in accordance with the laws of Indonesia, without regard to any conflict of laws provisions thereof. In the event any provision of this agreement is found to be unenforceable, such invalidity shall not affect the validity of the remaining portions of this Agreement. <p>8.2 This, together with our Privacy Policy, is the entire agreement between you and us and supersedes any prior or contemporaneous agreement, whether written, oral or other, relating to the subject matter of this agreement. We may amend this agreement from time to time without notice, but any such amendment will not affect your use of or contribution of Content to PetaBencana.id prior to the effective date of the amendment. You should revisit this agreement each time you use PetaBencana.id or submit a Flood Report to ensure that you understand the agreement that applies to such use or submission. <p>8.3 Our failure to exercise or enforce any right or provision of these TOS shall not constitute a waiver of such right or provision. If any provision of these TOS is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties" intentions as reflected in the provision and the other provisions of these TOS shall remain in full force and effect. <p>Effective Date: February 20<sup>th</sup>, 2020',
      'tab_content_id': '<p class="header">Persetujuan Pengguna PetaBencana.id</p><p>Persetujuan ini mengatur akses Anda ke PetaBencana.id, penggunaan PetaBencana.id, dan informasi, konten, dan fungsionalitas dari Situs PetaBencana.id. Dengan menggunakan PetaBencana.id atau berkontribusi dalam segala informasi teks, tautan, grafis, foto, video, atau material lainnya (“Konten”) kepada PetaBencana.id, Anda setuju untuk diatur dengan persetujuan ini.</p><p class="header">1. Tentang PetaBencana.id</p><p>1.1. PetaBencana.id adalah sebuah proyek dari Yayasan Peta Bencana dan dioperasikan melalui kolaborasi dengan Pacific Disaster Centre (PDC) dan Badan Nasional Penanggulangan Bencana (BNPB). MIT, PDC, dan BNPB secara kolektif dalam persetujuan ini disebut sebagai “Kami”. PetaBencana.id didukung oleh USAID. <p>1.2. PetaBencana.id mengumpulkan Laporan Banjir dari pengguna dan instansi pemerintah Indonesia untuk memetakan banjir. Tujuan dari PetaBencana.id adalah untuk menyediakan dan membagikan informasi terbaik mengenai lokasi banjir secara <i>real-time</i> untuk membantu penduduk dan pengambil keputusan dalam merespon banjir secara lebih baik. <p>1.3. Meskipun poin 1.2 adalah tujuan Kami, namun Konten dalam PetaBencana.id dapat bersifat tidak dapat diandalkan. Kami memercayakan kontributor untuk menyediakan informasi yang utuh dan akurat, namun tidak dapat mewakili atau menjamin keutuhan, keakuratan, dan keandalan dari Konten yang ditampilkan di PetaBencana.id. Kami tidak dapat mengambil tindakan untuk mengonfirmasi akurasi Konten Laporan Banjir. Segala penggunaan atau tindakan mengandalkan Konten lokasi banjir di PetaBencana.id, dengan demikian, sepenuhnya menjadi resiko dan tanggung jawab Anda.</p><p class="header">2. Laporan Banjir</p><p>2.1. Anda dapat melaporkan banjir melalui Kartu Laporan Banjir PetaBencana.id. Kartu Laporan dapat dipanggil dengan meminta Automated Program “Bot” PetaBencana.id untuk memberikan sebuah one-time-link melalui social messaging. Laporan Banjir yang Anda laporkan melalui PetaBencana.id ditambahkan ke peta banjir yang dapat diakses secara publik di <a href=https://petabencana.id/map>https://petabencana.id/map</a>. <p>2.2. Laporan Banjir dapat mencakup data berikut ini, yang dapat diakses secara publik: <ul> <li>Lokasi Anda pada saat melapor <li>Nama akun (username) social messaging atau user identification number</ul> <p>2.3. PetaBencana.id sewaktu-waktu dapat menolak atau menghapus segala Laporan Banjir dari Situs PetaBencana.id</p><p class="header">3. Konten Laporan Banjir</p><p>3.1. Anda sepenuhnya bertanggung jawab terhadap segala Konten yang Anda laporkan ke PetaBencana.id. Anda dilarang untuk menambahkan Konten yang dimiliki oleh orang lain, termasuk foto, tanpa izin yang jelas dari pemilik hak cipta. Dengan melaporkan Laporan Banjir, Anda menyatakan bahwa Anda memiliki seluruh hak, lisensi, persetujuan, dan izin yang diperlukan untuk melaporkan Konten dari Laporan Banjir, dan menghibahkan dan memberi kuasa kepada kami untuk memberikan lisensi berikut ini. <p>3.2. Kami tidak mengklaim kepemilikan dari Konten yang Anda laporkan dalam Laporan Banjir, namun dengan melaporkan Laporan Banjir, Anda menghibahkan Kami lisensi worldwide, tanpa royalti, non-exclusive, tanpa batas waktu, dan tidak dapat ditarik kembali, untuk menggunakan, membagikan, dan menampilkan Laporan Banjir Anda dan Konten yang terdapat dalam Laporan Banjir dan untuk memberikan sublisensi kepada Laporan Banjir Anda dan Konten di dalamnya di bawah Creative Commons Attribution 4.0 International License (untuk keterangan lebih lanjut, lihat lisensi tersebut dalam <a href=https://creativecommons.org/licenses/by/4.0/>https://creativecommons.org/licenses/by/4.0/ </a>). Hal ini berarti pihak lain dapat memperbanyak dan menggunakan Konten dari Laporan Banjir Anda.</p><p class="header">4. Hak Cipta Lainnya dan Perihal Lisensi</p><p>4.1. PetaBencana.id didukung oleh Open Source Software dan tersedia tanpa jaminan. Untuk detail lanjutan, silakan lihat <u>dokumentasi lisensi proyek</u> <u>(</u> <a href=https://github.com/petabencana/petabencana-meta/blob/master/petabencana.id/LICENSING.md>https://github.com/petabencana/petabencana-meta/blob/master/petabencana.id/LICENSING.md</a>). <p>4.2. Konten pada PetaBencana.id terlisensi di bawah Creative Commons Attribution 4.0 International License. <p>4.3. Apabila Anda yakin bahwa material yang memiliki hak cipta telah ditambahkan secara tidak pantas ke PetaBencana.id, harap hubungi agen hak cipta Kami di <a href=mailto:privacy@petabencana.id>privacy@petabencana.id</a> atau Yayasan Peta Bencana, Jl. Sumbing No.17, Guntur, Jakarta Selatan 12980, Indonesia. Pemberitahuan harap mencakup: <ul> <li>Identifikasi dari material yang memiliki hak cipta. <li>Identifikasi dari material yang diklaim telah dilanggar, termasuk informasi yang cukup untuk bagi Kami untuk melacak lokasi material (contohnya URL, alamat IP, nama komputer). <li>Informasi kontak Anda (contohnya alamat e-mail, nomor yang dapat dihubungi). <li>Pernyataan dari Anda bahwa Anda yakin penggunaan material tersebut tidak dikuasakan oleh pemilik hak cipta atau agen pemberi kuasa. <li>Pernyataan dari Anda bahwa informasi dalam pemberitahuan Anda adalah benar dan Anda adalah pemilik hak cipta atau diberi kuasa untuk bertindak atas nama pemilik hak cipta.</ul> <p class="header">5. Privasi Data</p><p>Kami menghargai privasi Anda. Untuk informasi dari data yang Kami kumpulkan dan bagaimana Kami menggunakan dan melindungi data Anda, silakan lihat Kebijakan Privasi Kami.</p><p class="header">6. <i>Disclaimer</i>; Batasan Tanggung Jawab</p><p>6.1. PETABENCANA.ID DAN SEGALA INFORMASI, KONTEN, ATAU LAYANAN YANG TERSEDIA PADA ATAU MELALUI PETABENCANA.ID DISEDIAKAN SECARA “SEBAGAIMANA ADANYA” (“<i>AS IS</i>”) DAN “SEBAGAIMANA TERSEDIA” (“<i>AS AVAILABLE</i>”) DAN KAMI MENYANGKAL SEGALA JAMINAN DALAM SEGALA BENTUK (PERNYATAAN, TERSIRAT, DAN LAINNYA), TERMASUK, TANPA BATASAN, SEGALA PEMBENARAN PENJUALBELIAN YANG TERSIRAT, KESESUAIAN UNTUK PENGGUNAAN TERTENTU DAN NON-PELANGGARAN DAN SEGALA PENJAMINAN BAHWA SITUS AKAN DIOPERASIKAN SECARA TIDAK TERINTERUPSI ATAU KONDISI BEBAS ERROR ATAU BEBAS VIRUS ATAU KOMPONEN BERBAHAYA LAINNYA, KECUALI SEJAUH SEGALA PENJAMINAN TERSEBUT DAPAT TIDAK DISANGKAL DI BAWAH HUKUM YANG BERLAKU. <p>6.2. KECUALI DILARANG DALAM HUKUM YANG BERLAKU, KAMI TIDAK BERTANGGUNG JAWAB UNTUK, DAN MENYATAKAN PENOLAKAN, TERHADAP SEGALA BENTUK KEHILANGAN, KECELAKAAN, KERUSAKAN, ATAU KERUGIAN YANG DISEBABKAN OLEH PENGGUNAAN PETABENCANA.ID DAN SEGALA KONTEN SITUS. PENIADAAN TANGGUNG JAWAB INI TERMASUK, DAN TIDAK TERBATAS PADA, SEGALA GANTI RUGI KHUSUS, TANPA SENGAJA, SEBAGAI AKIBAT, PENGHUKUMAN, ATAU DENDA, SEPERTI KEHILANGAN PENDAPATAN, DATA, PENDAPATAN YANG DIANTISIPASI, DALAM KONDISI APAPUN DAN KAPANPUN. PENIADAAN TANGGUNG JAWAB INI BERLAKU TERMASUK APABILA PEMBERI LISENSI MENGETAHUI ATAU DAPAT MENGETAHUI KEMUNGKINAN DARI KERUSAKAN TERSEBUT. <p>6.3. APABILA PENIADAAN TANGGUNG JAWAB TIDAK DAPAT DISANGKAL DI BAWAH HUKUM, SETIAP PERTANGGUNGJAWABAN KAMI TERBATAS PADA KEHILANGAN FINANSIAL YANG AKTUAL DAN LANGSUNG, YANG DAPAT DIBUKTIKAN BAHWA DIAKIBATKAN OLEH KELALAIAN KAMI SENDIRI.</p><p class="header">7. Ganti Rugi</p><p>7.1. Anda setuju untuk membela, membebaskan dan mengganti rugi setiap dari Kami, dan masing-masing cabang Kami, afiliasi, pejabat, petugas, fakultas, pelajar, anggota, anggota dewan yang menjabat, agen, dan pegawai dari dan terhadap segala klaim, aksi, atau permintaan pihak ketiga, yang keluar dari, disebabkan oleh, atau berhubungan dalam bentuk apapun terhadap pengunaan PetaBencana.id oleh Anda, termasuk segala bentuk tanggung jawab atau pengeluaran yang disebabkan segala dan seluruh klaim, kehilangan, kerugian (aktual atau sebagai akibat), perkara hukum, keputusan pengadilan, biaya proses pengadilan dan biaya pengacara, dalam segala bentuk dan kondisi. Dalam kondisi tersebut, salah satu dari Kami akan memberikan kepada Anda pemberitahuan tertulis terhadap klaim, perkara hukum, atau tindakan tersebut.</p><p class="header">8. Miscellaneous</p><p>8.1.  Persetujuan ini akan diatur dan diatur sesuai dengan hukum di Indonesia, tanpa memperhatikan segala konflik antarperaturan di antaranya. Apabila terdapat segala ketentuan dalam persetujuan ini yang ditemukan tidak dapat dilaksanakan, hal tersebut tidak mengubah pelaksanaan dari bagian lainnya dari Persetujuan ini. <p>8.2. Persetujuan ini, bersama dengan Kebijakan Privasi Kami, adalah persetujuan sepenuhnya antara Kami dan Anda dan menggantikan segala persetujuan yang ada sebelumnya atau berlaku bersamaan, baik tertulis, diucapkan, atau lainnya, yang berhubungan dengan subjek yang diatur dalam Persetujuan ini. Kami dapat mengubah Persetujuan ini sewaktu-waktu tanpa pemberitahuan, namun perubahan tersebut tidak akan mengubah penggunaan Anda atau kontribusi Anda terhadap Konten pada PetaBencana.id sebelum tanggal berlaku efektif dari perubahan tersebut. Anda dapat mengunjungi ulang Persetujuan ini setiap kali Anda menggunakan PetaBencana.id atau mengumpulkan Laporan Banjir untuk memastikan Anda memahami persetujuan yang berlaku untuk penggunaan atau pelaporan tersebut. <p>8.3. Kegagalan Kami dalam melaksanakan atau mengatur segala hak atau ketentuan dalam Ketentuan Layanan ini tidak diartikan mengabaikan segala hak atau ketentuan tersebut. Apabila terdapat ketentuan dalam Ketentuan Layanan ini ditemukan oleh pengadilan atau yurisdiksi yang berwenang bahwa tidak dapat dilaksanakan, pihak-pihak yang bersangkutan tetap setuju bahwa pengadilan harus mengusahakan tercapainya tujuan dari para pihak yang direfleksikan dalam ketentuan tersebut dan ketentuan lain dalam Ketentuan Layanan ini tetap berlaku sepenuhnya dan mengikat. <p>Tanggal Efektif Berlaku: 20 Februari 2020'
    },
    {
      'tab_key': 'p_p',
      'tab_name': 'terms.privacy',
      'tab_content_en': '<p class="header">PetaBencana.id Privacy Policy</p><p>Welcome to PetaBencana.id, a website that collects and shares flood information from residents and government agencies, helping to reduce risk during flood events. PetaBencana.id is a project of Yayasan Peta Bencana ("we," "us," "our," "ours"). We are committed to respecting the privacy of users who access the PetaBencana.id website (the "Site," which includes all pages within the PetaBencana.id domain). <p class="header">Web Server Logs</p><p>When you visit the Site, including for submission of flood reports, our web server may record the following information in its server log: <ul> <li>your IP Address <li>the URLs you have requested to access, <li>the dates and methods of requests, <li>the status code of your requests, <li>URLs of pages that referred you to the Site, <li>number of bytes transferred, <li>your web browser and operating system platform, <li>your location (if you provide it), <li>your preferred language (based on browser preference), and <li>your social messaging account username or user identification number </ul>We use server log information to help diagnose problems with our server and to administer our website by identifying which parts of the Site are most heavily used. We also use this information to tailor Site content to user needs and to generate aggregate statistical reports. Web server logs are retained on a temporary basis, during which time their contents are accessible to Site administrators, and then deleted completely from our systems. Unless required by legal process, we do not link IP addresses to any personally identifiable information. This means that user sessions will be tracked by IP address, but the user’s identity will remain anonymous. <p>We ordinarily do not disclose to third parties site usage by individual IP addresses, but we may do so in very limited circumstances to comply with law or legal process or when working with consultants assisting us with fixing or improving the Site or monitoring and improving the security of our network.<p class="header">User-Generated Content</p><p>User-generated content is collected via flood report cards. You may request a flood report card via the PetaBencana.id social messaging bot. You do not need to register to use flood report cards, although information you provide, including your social media username or ID number, is used to provide this service and contact you to confirm receipt of your report card. User-generated content will be available for all Site visitors to view and will identify you as the poster by the username from your social messaging account. <p>Any and all user-generated content that you post to the Site is publicly available to anyone who visits the Site, so do not post any information you do not want generally known to the public. More information about information collected through report cards can be found in our User Agreement. <p class="header">Research Access to Data</p><p>In addition to providing flood information to residents, government and disaster-response agencies, PetaBencana.id facilitates academic research into risk reduction. Any content you post to the Site may be used for academic research. <p class="header">Programming Analytics</p><p>In order to refine the resources on offer through the Site and to optimize PetaBencana.id programming, PetaBencana.id may elect to conduct internal analytics of content submitted by users. Any such internal analytics will be conducted on an anonymized set of user-generated content. <p class="header">Google Analytics</p><p>We use Google Analytics software to perform Site usage analytics. Google Analytics collects anonymous information from users to help us track Site usage and referrals from other websites. These data are used primarily to optimize the website experience for our visitors, but we may also use the data to assist us in marketing the Site. <p>Information collected and processed by Google Analytics includes the user’s IP address, network location, and geographic location. Google Analytics acquires all its information directly from the user, by installing a cookie (see below) on JavaScript-enabled computers. The Site does not share any information it collects with Google, and Google does not collect any personally identifiable information. <p class="header">Cookies</p><p>Cookies are unique bits of computer data that many major websites will transfer to your computer the first time that you visit. Cookies are stored on your hard drive and may be later accessed by the website to track prior usage. As noted above, Google Analytics will install a cookie on the hard drives of Site visitors. <p class="header">Disclosure To The Third Parties</p><p>We will not sell, lend, or disclose to third parties any personally identifiable information we collect, except as discussed in this Policy or required by law or legal process. We may disclose information to Yayasan Peta Bencana employees, consultants and agents who have a legitimate need to know the information for the purpose of fixing or improving the Site and monitoring and improving the security of our network. We may also disclose this information when special circumstances call for it, such as when disclosure is required by law or legal process or when disclosure is, in our judgement, necessary to protect our legal rights, including intellectual property rights. <p class="header">Other Websites</p><p>This Site may contain links to other web resources, including websites of organizations other than Yayasan Peta Bencana. The websites to which the Site links may also install cookies on your computer, log your access to their web pages, or collect user-identifying information directly from you, once you proceed to those sites. We are not responsible for the privacy practices of other sites to which the Site links. The privacy policies on those sites, if any, will govern your use of the sites. <p class="header">Data Security</p><p>We have in place physical, electronic and managerial procedures to protect the information we collect online. However, as effective as these measures are, no security system is impenetrable. We cannot completely guarantee the security of our database, nor can we guarantee that the information you supply will not be intercepted while being transmitted to us over the Internet. <p class="header">Notification Of Changes In The Privacy Policy</p><p>We will review our security measures and Privacy Policy on a periodic basis. We may change our Privacy Policy from time to time based on those reviews or because we add or change services or features. If we change our Privacy Policy, we will post it on the Site. We encourage you to review our Privacy Policy on a regular basis. <p>If you have any questions about this Privacy Policy, the practices of this Site, or your dealings with this Site, you can contact privacy@petabencana.id or Yayasan Peta Bencana, Jl. Sumbing No.17, Guntur, Jakarta Selatan 12980, Indonesia.',
      'tab_content_id': '<p class="header">Kebijakan Privasi PetaBencana.id</p><p>Selamat datang di PetaBencana.id, situs web yang mengumpulkan dan menyajikan informasi genangan dari warga dan lembaga pemerintah, membantu untuk mengurangi risiko selama kejadian banjir.  PetaBencana.id merupakan proyek dari Yayasan Peta Bencana (yang kemudian disebut “Kami”). Kami berkomitmen untuk menghargai privasi dari pengguna yang mengakses situs web PetaBencana.id (yang kemudian disebut sebagai “Situs”, termasuk di dalamnya seluruh bagian dari PetaBencana.id domain). <p>CATATAN DI WEB SERVER</p><p>Ketika Anda mengunjungi situs ini, termasuk ketika melaporkan kejadian genangan, situs kami akan menyimpan informasi-informasi berikut ini di dalam <i>server</i>: <ul> <li>Alamat IP anda, <li>URL yang Anda panggil untuk diakses, <li>Tanggal dan metode pemanggilan untuk akses, <li>Kode status dari pemanggilan Anda, <li>URL dari laman yang merujuk Anda pada Situs, <li>Jumlah <i>byte</i> yang ditransfer, <li>Web browser Anda dan sistem operasi platform Anda, <li>Lokasi Anda (apabila Anda menyediakan), <li>Pilihan bahasa Anda (berdasarkan pilihan dari browser), dan <li>Nama akun <i>social messaging</i> Anda atau nomor identifikasi user (User ID). </ul>Kami menggunakan informasi dalam catatan <i>server</i> untuk membantu mendiagnosa permasalahan yang terjadi dalam <i>server</i> kami dan untuk mengelola <i>website</i> kami dengan mengidentifikasi bagian mana dari Situs yang paling banyak digunakan. Kami juga menggunakan informasi ini untuk menyesuaikan konten Situs dengan kebutuhan pengguna dan untuk menghasilkan laporan statistik agregat. Catatan di web <i>server</i> disimpan secara temporer, selama konten catatan dapat diakses oleh administratur Situs, dan kemudian dihapus sepenuhnya dari sistem Kami. Kecuali dibutuhkan dalam proses hukum, kami tidak menghubungkan alamat IP dengan informasi apapun yang dapat mendeteksi identitas personal. Hal ini berarti sesi pengguna dapat ditelusuri melalui alamat IP, namun identitas pengguna akan tetap bersifat anonim. <p>Kami, pada umumnya,tidak membuka data penggunaan Situs berdasarkan alamat IP individual kepada pihak ketiga, namun Kami dapat melakukan hal tersebut dalam keadaan sangat terbatas untuk mengikuti proses hukum atau ketika bekerja dengan konsultan yang membantu kami untuk memperbaiki atau meningkatkan layanan Situs atau untuk memonitor dan memperbaiki keamanan dari jaringan Kami.</ul> <p class="header"><i>USER-GENERATED CONTENT</i></p><p>dikumpulkan melalui kartu laporan banjir. Anda dapat memanggil akses kartu laporan banjir melalui bot <i>social messaging</i> PetaBencana.id. Anda tidak perlu mendaftar untuk menggunakan kartu laporan banjir, meskipun informasi yang anda sediakan, termasuk nama akun (<i>username</i>) media sosial atau nomor ID, digunakan untuk menyediakan layanan ini dan mengontak Anda untuk mengkonfirmasi penerimaan dari laporan banjir Anda. <i>User-generated content</i> akan tersedia untuk seluruh pengunjung Situs untuk ditampilkan, dan akan mengidentifikasi Anda sebagai pelapor melalui <i>username</i> dari akun <i>social messaging</i> Anda. <p>Seluruh dan setiap <i>user-generated content</i> yang Anda kirim ke Situs akan tersedia secara publik kepada setiap pengunjung Situs, sehingga tidak diperbolehkan mengirim segala informasi yang Anda tidak ingin diketahui kepada publik. Informasi lebih lanjut terkait informasi yang dikumpulkan melalui kartu laporan dapat diakses di Persetujuan Pengguna (link to Persetujuan Pengguna). <p class="header">AKSES PENELITIAN TERHADAP DATA</p><p>Sebagai tambahan dari penyediaan informasi banjir kepada warga, pemerintah, dan instansi tanggap darurat, PetaBencana.id memfasilitasi penelitian akademis untuk pengurangan resiko. Segala konten yang Anda kirim ke Situs dapat digunakan untuk penelitian akademis. <p class="header"><i>PROGRAMMING ANALYTICS</i></p><p>Dalam rangka menyaring sumber daya yang ditawarkan melalui Situs dan mengoptimalkan programming PetaBencana.id, PetaBencana.id dapat melakukan internal <i>analytics</i> terhadap konten yang dikirimkan oleh pengguna. Segala langkah internal <i>analytics</i> akan dilakukan terhadap <i>user-generated content</i> yang anonim. <p class="header"><i>GOOGLE ANALYTICS</i></p><p>Kami menggunakan perangkat lunak Google <i>Analytics</i> untuk melakukan analisis penggunaan Situs. Google <i>Analytics</i> mengumpulkan informasi anonim dari pengguna untuk membantu kami menelusuri penggunaan Situs dan rujukan dari situs lainnya. Data ini digunakan terutama untuk mengoptimalkan <i>website</i> experience untuk pengguna Kami, namun Kami juga dpaat menggunakan data tersebut untuk membantu kami dalam mempromosikan Situs. <p>Informasi yang dikumpulkan dan diproses oleh Google <i>Analytics</i> mencakup alamat IP pengguna, lokasi jaringan, dan lokasi geografis. Google <i>Analytics</i> memperoleh seluruh informasi langsung dari pengguna, dengan memasang <i>cookie</i> (lihat di bawah) dalam komputer yang tersedia JavaScript. Situs tidak membagikan informasi apapun yang dikumpulkan kepada Google, dan Google tidak mengumpulkan informasi yang dapat mendeteksi identitas personal. <p class="header"><i>COOKIES</i></p><p>s adalah bit unik dari data komputer yang ditransfer dari sebagian besar<i>website</i> kepada komputer Anda saat pertama kali Anda mengunjungi<i>website</i> tersebut, termasuk Situs. <i>Cookie</i>s disimpan dalam <i>hard drive</i> Anda dan dapat diakses oleh <i>website</i> untuk menelusuri penggunaan sebelumnya. Seperti disebutkan di atas, Google <i>Analytics</i> akan memasang <i>cookie</i> pada <i>hard drive</i> pengguna Situs. <p class="header">PENYINGKAPAN KEPADA PIHAK KETIGA</p><p>Kami tidak akan menjual, meminjamkan, atau menyingkap segala informasi yang dapat mendeteksi identitas personal yang Kami kumpulkan, kepada pihak ketiga,kecuali seperti telah disebutkan dalam Kebijakan ini atau dibutuhkan untuk proses hukum. Kami dapat membuka informasi kepada karyawan Yayasan Peta Bencana, konsultan, dan agen yang memiliki legitimasi untuk mengetahui informasi tersebut, dalam tujuan memperbaiki atau meningkatkan Situs atau untuk memonitor dan memperbaiki keamanan dari jaringan Kami. Kami juga dapat membuka informasi ini ketika keadaan khusus, seperti penyingkapan informasi diperlukan untuk proses hukum, atau ketika penyingkapan, dalam pertimbangan Kami, diperlukan untuk melindungi hak Kami di mata hukum, termasuk hak kekayaan intelektual. <p class="header"><i>WEBSITE</i> LAINNYA</p><p>Situs ini dapat mengandung tautan ke web lainnya, termasuk <i>website</i> organisasi selain Massachusetts Institute of Technology. <i>Website</i> yang ditautkan oleh Situs dapat memasang <i>cookie</i>s di komputer Anda, mencatat akses Anda ke <i>website</i> mereka, atau mengumpulkan informasi identifikasi pengguna (user-identifying information) secara langsung dari Anda, saat Anda mengakses situs mereka. Kami tidak bertanggung jawab untuk seluruh praktek privasi dari <i>website</i> lainnya yang ditautkan oleh Situs Kebijakan privasi dari <i>website</i>-<i>website</i> tersebut, apabila ada, dapat mengatur penggunaan Anda terhadap <i>website</i> tersebut. <p class="header">KEAMANAN DATA</p><p>Kami memiliki prosedur fisik, elektronik, dan manajerial untuk melindungi informasi yang Kami kumpulkan secara online. Bagaimanapun, seefektif apapun langkah-langkah tersebut, tidak ada sistem keamanan yang tidak dapat ditembus. Kami tidak dapat menjamin sepenuhnya keamanan dari database Kami, dan Kami tidak dapat menjamin informasi yang Anda kirimkan tidak akan disadap ketika dikirimkan kepada Kami melalui Internet. <p class="header">NOTIFIKASI PERUBAHAN KEBIJAKAN PRIVASI</p><p>Kami akan meninjau langkah-langkah pengamanan Kami dan Kebijakan Privasi secara periodik. Kami dapat mengubah Kebijakan Prviasi kami dari waktu ke waktu berdasarkan peninjauan ulang tersebut, atau dikarenakan Kami menambah atau mengubah layanan atau fitur. Apabila Kami mengubah Kebijakan Privasi, Kami akan mengunggah perubahan tersebut ke Situs. Kami menghimbau Anda untuk mengecek Kebijakan Privasi kami secara berkala. <p>Apabila terdapat pertanyaan terhadap Kebijakan Privasi ini, tata laksana Situs ini, atau transaksi terkait Situs ini, Anda dapat menghubungi <a href=mailto:contactprivacy@petabencana.id>contactprivacy@petabencana.id </a>atau Yayasan Peta Bencana, Jl. Sumbing No.17, Guntur, Jakarta Selatan 12980, Indonesia.'
    }
  ];
  tabContent = "";

  constructor(
    public deckService: DeckService,
    public translate: TranslateService,
    public navController: NavigationService
  ) {}

  get donationdetails() {
    return this.deckService.selectedProducts;
  }

  async ngOnInit() {
    this.address = await this.deckService.fetchAddress();
    this.deckService.userCanBack();
    this.deckService.userCannotContinue();
    this.switchTab(this.termscontents[0].tab_key);
  }

  get donationDate() {
    return this.deckService.donationDate;
  }
  get donationTime() {
    return this.deckService.donationTime;
  }

  get reviewDescription(): string {
    return this.translate.instant('card.giverLabels.reviewDescription');
  }
  get text(): string {
    return this.translate.instant('card.giverLabels.text');
  }


  truncateDescription(description: string, maxLines: number): string {
    const lines = description.split('\n');
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join('\n') + (maxLines > 1 ? '...' : '');
    }
    return description;
  }

  private recordQuantityChange(
    title: string,
    quantity: number,
    category: string,
    description: string,
    img: string,
    units: string,
    item_id: string,
    hasDescription: boolean,
    need_id: number,
    donate: number,
    limit: number,
    totalUserDonated: number
  ) {
    this.deckService.setSelectedProducts(
      title,
      quantity,
      category,
      description,
      img,
      units,
      item_id,
      hasDescription,
      need_id,
      donate,
      limit,
      totalUserDonated
    );
  }

  increaseQuantity(card: any) {
    if (card.quantity > card.donate) {
      this.userDonate = card.donate
      this.userDonate += 1;
      card.donate = this.userDonate;
      card.totalUserDonated = this.userDonate + card.limit;
      this.recordQuantityChange(
        card.title,
        card.quantity,
        card.category,
        card.description,
        card.img,
        card.units,
        card.item_id,
        card.hasDescription,
        card.need_id,
        card.donate,
        card.limit,
        card.totalUserDonated
      );
    }
  }

  decreaseQuantity(card: any) {
    if (card.donate && card.donate > 0) {
      this.userDonate = card.donate
      this.userDonate -= 1;
      card.donate = this.userDonate
      card.totalUserDonated = card.donate + card.limit
      if (card.donate === 0 || card.donate === card.limit) {
        // If donate becomes 0, remove the product from selectedProducts
        this.deckService.setSelectedProducts(
          card.title,
          0,
          card.category,
          card.description,
          card.img,
          card.units,
          card.item_id,
          card.hasDescription,
          card.need_id,
          card.donate,
          card.limit,
          card.totalUserDonated
        );
      } else {
        // If donate is greater than 0, update selectedProducts
        this.recordQuantityChange(
          card.title,
          card.quantity,
          card.category,
          card.description,
          card.img,
          card.units,
          card.item_id,
          card.hasDescription,
          card.need_id,
          card.donate,
          card.limit,
          card.totalUserDonated
        );
      }
    }
  }

 
  openDescriptionModal(card: any): void {
    card.showModal = true;
  }

  closeModal(card: any): void {
    card.showModal = false;
  }

  handleSuccess(event) {
    // add verification step
    this.deckService.setCaptchaCleared();
  }

  switchTab(key) {
    var lang = this.translate.currentLang;
    console.log(this.translate.currentLang);
    this.termscontents.forEach(element => {
      if(element.tab_key === key) 
        this.tabContent = element['tab_content_'+(lang || 'id')]; 
      else
        $("."+element.tab_key).removeClass("active");
      });
    $("."+key).addClass("active");
  }

  showTerms() {
    $('#termsPopup').show(); 
  }

  closeTerms() {
    $('#termsPopup').hide();
  }
}
