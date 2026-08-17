import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

// Multi-scenario data structure (6 Scenarios)
const scenariosData = [
  {
    id: 1,
    badge: "TÌNH HUỐNG 1",
    title: "TRUYỀN THÔNG & BRANDING",
    topicTitle: "TÌNH HUỐNG 1: TRUYỀN THÔNG & BRANDING",
    landingSubtitle: "Moral Dilemma Game — Trò chơi Trách nhiệm & Đạo đức Truyền thông dành cho Lớp học",
    scenes: [
      {
        id: 1,
        label: "Cảnh 1 / 4",
        speaker: "Người kể chuyện",
        speakerType: "default",
        text: "Bạn là PR Director dẫn dắt một chiến dịch rebranding lớn. Mọi kỳ vọng của doanh nghiệp và hàng trăm nhân sự đang đặt vào sự thành công của chiến dịch này.",
        imageSrc: "/assets/scene3.png",
        placeholderLabel: "📷 Ảnh cảnh 1 — Tình huống 1"
      },
      {
        id: 2,
        label: "Cảnh 2 / 4",
        speaker: "Thành",
        speakerType: "thanh",
        text: "Thành là người duy nhất có tư duy thiết kế kiệt xuất. Bộ nhận diện mới do Thành đảm nhận dự kiến mang về doanh thu kỷ lục và hợp đồng lớn cho công ty.",
        imageSrc: "/assets/scene2.png",
        placeholderLabel: "📷 Ảnh cảnh 2 — Tình huống 1"
      },
      {
        id: 3,
        label: "Cảnh 3 / 4",
        speaker: "Bạn (suy nghĩ)",
        speakerType: "ban",
        text: "Ngay sát ngày tung chiến dịch, bạn phát hiện bằng chứng: Thành từng có hành vi 'đào lửa', quấy rối và chèn ép tàn nhẫn nhiều thực tập sinh cấp dưới trong thời gian dài.",
        imageSrc: "/assets/scene1.png",
        placeholderLabel: "📷 Ảnh cảnh 3 — Tình huống 1"
      },
      {
        id: 4,
        label: "Cảnh 4 / 4",
        speaker: "Người kể chuyện",
        speakerType: "default",
        text: "Nếu HỦY HỢP ĐỒNG: chiến dịch sụp đổ, doanh nghiệp lỗ nặng, mất hợp đồng lớn. Nếu TIẾP TỤC: bạn đang nhắm mắt làm ngơ trước hành vi vi phạm đạo đức nghiêm trọng để đổi lấy lợi ích kinh tế.",
        imageSrc: "/assets/scene4.png",
        placeholderLabel: "📷 Ảnh cảnh 4 — Tình huống 1"
      }
    ],
    vote: {
      redLabel: "HỦY HỢP ĐỒNG",
      redSubtitle: "Bảo vệ thực tập sinh, chấp nhận thiệt hại kinh doanh",
      blueLabel: "TIẾP TỤC CHIẾN DỊCH",
      blueSubtitle: "Ưu tiên doanh thu, xử lý nội bộ sau"
    },
    results: {
      redCardHeader: "Nếu HỦY HỢP ĐỒNG",
      redCardBody: "Bạn đã chọn đạo đức. Doanh nghiệp lỗ nặng, nhưng văn hóa tổ chức và niềm tin nội bộ được bảo vệ.",
      blueCardHeader: "Nếu TIẾP TỤC",
      blueCardBody: "Bạn đã chọn lợi ích kinh tế. Nhưng bạn đang đồng lõa với hành vi vô đạo đức và tạo tiền lệ nguy hiểm.",
      redProgressLabel: "HỦY HỢP ĐỒNG (ĐẠO ĐỨC)",
      blueProgressLabel: "TIẾP TỤC CHIẾN DỊCH (LỢI ÍCH)"
    }
  },
  {
    id: 2,
    badge: "TÌNH HUỐNG 2",
    title: "SẢN PHẨM SÁNG TẠO & AI",
    topicTitle: "TÌNH HUỐNG 2: SẢN PHẨM SÁNG TẠO & AI",
    landingSubtitle: "Moral Dilemma Game — Trò chơi Đạo đức Thiết kế & Bản quyền AI dành cho Lớp học",
    scenes: [
      {
        id: 1,
        label: "Cảnh 1 / 4",
        speaker: "Người kể chuyện",
        speakerType: "default",
        text: "Bạn là Lead Designer dẫn dắt dự án thiết kế tự động hóa. Hạn bàn giao cho khách hàng đang đến rất gần và áp lực sản phẩm vô cùng lớn.",
        imageSrc: "/assets/s2_scene1.jpg",
        placeholderLabel: "📷 Ảnh cảnh 1 — Tình huống 2"
      },
      {
        id: 2,
        label: "Cảnh 2 / 4",
        speaker: "Bi",
        speakerType: "thanh",
        text: "Bi là ngôi sao của team với năng lực thượng thừa. Một mình Bi đã lập trình xong thuật toán AI giúp tự động hóa toàn bộ quy trình thiết kế cho khách hàng.",
        imageSrc: "/assets/s2_scene2.jpg",
        placeholderLabel: "📷 Ảnh cảnh 2 — Tình huống 2"
      },
      {
        id: 3,
        label: "Cảnh 3 / 4",
        speaker: "Bạn (suy nghĩ)",
        speakerType: "ban",
        text: "Tuy nhiên, bạn phát hiện Bi đã âm thầm ăn trộm toàn bộ kho dữ liệu artwork bản quyền của các nghệ sĩ độc lập trên mạng mà chưa xin phép để training cho AI. Bi dọa nếu bị tố cáo sẽ xóa toàn bộ source code và nghỉ việc.",
        imageSrc: "/assets/s2_scene3.jpg",
        placeholderLabel: "📷 Ảnh cảnh 3 — Tình huống 2"
      },
      {
        id: 4,
        label: "Cảnh 4 / 4",
        speaker: "Người kể chuyện",
        speakerType: "default",
        text: "Nếu TỐ CÁO BI: Sản phẩm bị hủy, nhóm không có gì bàn giao cho khách. Nếu GIỮ LẠI: Sản phẩm được ra mắt thành công, nhưng dựa trên sự ăn cắp công sức và bản quyền người khác.",
        imageSrc: "/assets/s2_scene4.jpg",
        placeholderLabel: "📷 Ảnh cảnh 4 — Tình huống 2"
      }
    ],
    vote: {
      redLabel: "TỐ CÁO BI & HỦY DỰ ÁN",
      redSubtitle: "Bảo vệ bản quyền nghệ sĩ, chấp nhận sản phẩm bị hủy",
      blueLabel: "GIỮ LẠI & RA MẤT",
      blueSubtitle: "Bàn giao đúng hạn khách hàng, nhắm mắt làm ngơ"
    },
    results: {
      redCardHeader: "Nếu TỐ CÁO BI",
      redCardBody: "Bạn đã bảo vệ bản quyền nghệ sĩ và đạo đức nghề nghiệp. Sản phẩm bị hủy, nhóm không có gì bàn giao cho khách.",
      blueCardHeader: "Nếu GIỮ LẠI",
      blueCardBody: "Bạn đã đảm bảo tiến độ bàn giao cho khách hàng. Nhưng bạn đang tiếp tay cho việc xâm phạm bản quyền và ăn cắp công sức người khác.",
      redProgressLabel: "TỐ CÁO BI (BẢO VỆ BẢN QUYỀN)",
      blueProgressLabel: "GIỮ LẠI (TIẾN ĐỘ BÀN GIAO)"
    }
  },
  {
    id: 3,
    badge: "TÌNH HUỐNG 3",
    title: "QUẢN TRỊ & NHÂN SỰ",
    topicTitle: "TÌNH HUỐNG 3: QUẢN TRỊ & NHÂN SỰ",
    landingSubtitle: "Moral Dilemma Game — Trò chơi Đạo đức Quản trị & Nhân sự dành cho Lớp học",
    scenes: [
      {
        id: 1,
        label: "Cảnh 1 / 4",
        speaker: "Người kể chuyện",
        speakerType: "default",
        text: "Bạn là Project Leader dẫn dắt một sự kiện quy mô lớn. Thời gian gấp rút và dự án đang đứng trước rủi ro vỡ trận nghiêm trọng nếu không có một Leader Operations đủ sức gánh vác.",
        imageSrc: "/assets/s3_scene1.jpg",
        placeholderLabel: "📷 Ảnh cảnh 1 — Tình huống 3"
      },
      {
        id: 2,
        label: "Cảnh 2 / 4",
        speaker: "Nhi (Ứng viên 1)",
        speakerType: "thanh",
        text: "Phe Đỏ chọn Nhi: Nhi có năng lực kiệt xuất, quan hệ rộng, cam kết gánh sự kiện thành công rực rỡ. Nhưng Nhi nổi tiếng cực kỳ thực dụng, sẵn sàng chơi xấu đồng nghiệp, làm giả budget và coi thường tập thể.",
        imageSrc: "/assets/s3_scene2.jpg",
        placeholderLabel: "📷 Ảnh cảnh 2 — Tình huống 3"
      },
      {
        id: 3,
        label: "Cảnh 3 / 4",
        speaker: "Yến (Ứng viên 2)",
        speakerType: "ban",
        text: "Phe Xanh chọn Yến: Yến rất trung thực, sống nguyên tắc, trách nhiệm cao và được mọi người yêu quý. Tuy nhiên, năng lực quản lý của Yến chỉ ở mức trung bình khá, khó cam kết sự kiện thành công 100%.",
        imageSrc: "/assets/s3_scene3.jpg",
        placeholderLabel: "📷 Ảnh cảnh 3 — Tình huống 3"
      },
      {
        id: 4,
        label: "Cảnh 4 / 4",
        speaker: "Người kể chuyện",
        speakerType: "default",
        text: "Nếu CHỌN NHI: Đảm bảo sự kiện thành công rực rỡ nhưng chấp nhận rủi ro vi phạm đạo đức, làm giả budget & phá hỏng văn hóa. Nếu CHỌN YẾN: Bảo vệ sự trung thực & văn hóa nhưng đối mặt nguy cơ sự kiện vỡ trận.",
        imageSrc: "/assets/s3_scene4.jpg",
        placeholderLabel: "📷 Ảnh cảnh 4 — Tình huống 3"
      }
    ],
    vote: {
      redLabel: "CHỌN NHI (THỰC DỤNG & NĂNG LỰC)",
      redSubtitle: "Cam kết sự kiện thành công 100%, chấp nhận chơi xấu & giả budget",
      blueLabel: "CHỌN YẾN (TRUNG THỰC & TRÁCH NHIỆM)",
      blueSubtitle: "Bảo vệ sự trung thực & văn hóa, chấp nhận rủi ro vỡ trận"
    },
    results: {
      redCardHeader: "Nếu CHỌN NHI",
      redCardBody: "Bạn ưu tiên kết quả & năng lực. Sự kiện thành công rực rỡ nhưng văn hóa làm việc bị hủy hoại và tiền lệ xấu về sự giả dối được chấp nhận.",
      blueCardHeader: "Nếu CHỌN YẾN",
      blueCardBody: "Bạn ưu tiên sự trung thực & văn hóa tập thể. Nội bộ gắn kết nhưng dự án đối mặt rủi ro vỡ trận do thiếu năng lực đột phá.",
      redProgressLabel: "CHỌN NHI (NĂNG LỰC / KẾT QUẢ)",
      blueProgressLabel: "CHỌN YẾN (TRUNG THỰC / VĂN HÓA)"
    }
  },
  {
    id: 4,
    badge: "TÌNH HUỐNG 4",
    title: "TÀI CHÍNH & SỰ THẬT",
    topicTitle: "TÌNH HUỐNG 4: TÀI CHÍNH & SỰ THẬT",
    landingSubtitle: "Moral Dilemma Game — Trò chơi Đạo đức Kế toán & Tài chính dành cho Lớp học",
    scenes: [
      {
        id: 1,
        label: "Cảnh 1 / 4",
        speaker: "Người kể chuyện",
        speakerType: "default",
        text: "Bạn là Kế toán trưởng của một công ty dịch vụ. Cuối năm, áp lực tài chính đè nặng khi hàng trăm công nhân đang mong chờ tiền lương và thưởng Tết để trang trải cuộc sống gia đình.",
        imageSrc: "/assets/s4_scene1.jpg",
        placeholderLabel: "📷 Ảnh cảnh 1 — Tình huống 4"
      },
      {
        id: 2,
        label: "Cảnh 2 / 4",
        speaker: "Giám đốc",
        speakerType: "thanh",
        text: "Giám đốc yêu cầu bạn chỉnh sửa nhẹ một số số liệu trong báo cáo tài chính để công ty đủ điều kiện vay vốn ngân hàng trả lương, thưởng Tết cho các công nhân đang rất khó khăn.",
        imageSrc: "/assets/s4_scene2.jpg",
        placeholderLabel: "📷 Ảnh cảnh 2 — Tình huống 4"
      },
      {
        id: 3,
        label: "Cảnh 3 / 4",
        speaker: "Bạn (suy nghĩ)",
        speakerType: "ban",
        text: "Nếu chỉnh sửa báo cáo: công ty qua được khủng hoảng, công nhân có tiền ăn Tết nhưng bạn vi phạm pháp luật và đạo đức nghề nghiệp. Nếu từ chối: bạn giữ được sự trung thực nhưng công ty phá sản, hàng trăm người lao động mất Tết.",
        imageSrc: "/assets/s4_scene3.jpg",
        placeholderLabel: "📷 Ảnh cảnh 3 — Tình huống 4"
      },
      {
        id: 4,
        label: "Cảnh 4 / 4",
        speaker: "Người kể chuyện",
        speakerType: "default",
        text: "Nếu CHỈNH SỬA: Linh hoạt giúp công ty vượt qua khó khăn tài chính và đảm bảo quyền lợi trước mắt cho công nhân. Nếu TỪ CHỐI: Bảo vệ tính trung thực và nguyên tắc đạo đức nghề nghiệp, chấp nhận thực tế.",
        imageSrc: "/assets/s4_scene4.jpg",
        placeholderLabel: "📷 Ảnh cảnh 4 — Tình huống 4"
      }
    ],
    vote: {
      redLabel: "LINH HOẠT CHỈNH SỬA BÁO CÁO",
      redSubtitle: "Giúp công ty vượt khó khăn, đảm bảo lương thưởng Tết cho công nhân",
      blueLabel: "TỪ CHỐI CHỈNH SỬA BÁO CÁO",
      blueSubtitle: "Bảo vệ tính trung thực và nguyên tắc đạo đức nghề nghiệp"
    },
    results: {
      redCardHeader: "Nếu CHỈNH SỬA BÁO CÁO",
      redCardBody: "Bạn đã giúp công ty vượt khủng hoảng và đảm bảo quyền lợi trước mắt cho hàng trăm công nhân. Nhưng bạn đã vi phạm pháp luật và đạo đức nghề nghiệp.",
      blueCardHeader: "Nếu TỪ CHỐI CHỈNH SỬA",
      blueCardBody: "Bạn đã bảo vệ tính trung thực và nguyên tắc đạo đức nghề nghiệp. Nhưng công ty phá sản và hàng trăm người lao động mất Tết.",
      redProgressLabel: "CHỈNH SỬA BÁO CÁO (QỦY LƯƠNG CÔNG NHÂN)",
      blueProgressLabel: "TỪ CHỐI CHỈNH SỬA (TRUNG THỰC NGHỀ NGHIỆP)"
    }
  },
  {
    id: 5,
    badge: "TÌNH HUỐNG 5",
    title: "ĐỒ ÁN MÔN HỌC",
    topicTitle: "TÌNH HUỐNG 5: ĐỒ ÁN MÔN HỌC",
    landingSubtitle: "Moral Dilemma Game — Trò chơi Đạo đức Làm việc nhóm & Đồ án Tốt nghiệp dành cho Lớp học",
    scenes: [
      {
        id: 1,
        label: "Cảnh 1 / 4",
        speaker: "Người kể chuyện",
        speakerType: "default",
        text: "Bạn là Trưởng nhóm một đồ án tốt nghiệp quan trọng. Trong nhóm có Tuấn — một người có kỹ năng làm slide, thuyết trình giỏi và giải bài tập đỉnh cao giúp bài nhóm luôn đạt điểm A.",
        imageSrc: "/assets/s5_scene1.jpg",
        placeholderLabel: "📷 Ảnh cảnh 1 — Tình huống 5"
      },
      {
        id: 2,
        label: "Cảnh 2 / 4",
        speaker: "Tuấn",
        speakerType: "thanh",
        text: "Tuy nhiên, Tuấn cực kỳ coi thường đồng đội, liên tục đi muộn, không làm task lặt vặt và ép cả nhóm theo ý mình. Sát ngày nộp bài, Tuấn ép: 'Tui gánh 80%, nếu không để tui làm tác giả chính và gạch tên 1 bạn yếu nhất ra thì tui rút slide tự nộp riêng'.",
        imageSrc: "/assets/s5_scene2.jpg",
        placeholderLabel: "📷 Ảnh cảnh 2 — Tình huống 5"
      },
      {
        id: 3,
        label: "Cảnh 3 / 4",
        speaker: "Bạn (suy nghĩ)",
        speakerType: "ban",
        text: "Nếu chấp nhận yêu cầu của Tuấn: nhóm chắc chắn điểm A, ra trường đúng hạn nhưng bạn tiếp tục chịu đựng sự chèn ép và bất công đối với thành viên khác. Nếu từ chối: Tuấn rút bài, nhóm nguy cơ bị fail đồ án và phải học lại.",
        imageSrc: "/assets/s5_scene3.jpg",
        placeholderLabel: "📷 Ảnh cảnh 3 — Tình huống 5"
      },
      {
        id: 4,
        label: "Cảnh 4 / 4",
        speaker: "Người kể chuyện",
        speakerType: "default",
        text: "Nếu CHẤP NHẬN: Bảo vệ điểm số đồ án cho cả nhóm ra trường đúng hạn. Nếu TỪ CHỐI: Gạch tên Tuấn khỏi nhóm để bảo vệ sự công bằng và đạo đức làm việc nhóm, chấp nhận rủi ro.",
        imageSrc: "/assets/s5_scene4.jpg",
        placeholderLabel: "📷 Ảnh cảnh 4 — Tình huống 5"
      }
    ],
    vote: {
      redLabel: "CHẤP NHẬN ĐIỀU KIỆN CỦA TUẤN",
      redSubtitle: "Bảo vệ điểm số đồ án A cho cả nhóm ra trường đúng hạn",
      blueLabel: "TỪ CHỐI & GẠCH TÊN TUẤN",
      blueSubtitle: "Bảo vệ sự công bằng và đạo đức làm việc nhóm"
    },
    results: {
      redCardHeader: "Nếu CHẤP NHẬN ĐIỀU KIỆN",
      redCardBody: "Cả nhóm đạt điểm A và ra trường đúng hạn. Nhưng bạn đã chấp nhận sự chèn ép, bất công và hy sinh thành viên yếu thế.",
      blueCardHeader: "Nếu TỪ CHỐI & GẠCH TÊN",
      blueCardBody: "Bạn bảo vệ được sự công bằng và tinh thần tập thể. Nhưng nhóm đứng trước nguy cơ trượt đồ án và phải học lại.",
      redProgressLabel: "CHẤP NHẬN ĐIỀU KIỆN (ĐIỂM SỐ & TỐT NGHIỆP)",
      blueProgressLabel: "TỪ CHỐI & GẠCH TÊN (CÔNG BẰNG & VĂN HÓA)"
    }
  },
  {
    id: 6,
    badge: "TÌNH HUỐNG 6",
    title: "BẢO VỆ KẺ YẾU THẾ NƠI CÔNG CỘNG",
    topicTitle: "TÌNH HUỐNG 6: BẢO VỆ KẺ YẾU THẾ NƠI CÔNG CỘNG",
    landingSubtitle: "Moral Dilemma Game — Trò chơi Đạo đức Nơi Công cộng & Bảo vệ Kẻ Yếu thế dành cho Lớp học",
    scenes: [
      {
        id: 1,
        label: "Cảnh 1 / 4",
        speaker: "Người kể chuyện",
        speakerType: "default",
        text: "Bạn là nhân viên truyền thông trẻ tại một sự kiện âm nhạc lớn. Anh Hoàng là Giám đốc Kỹ thuật âm thanh — người duy nhất đủ trình độ vận hành hệ thống âm thanh/ánh sáng tỷ đồng.",
        imageSrc: "/assets/s6_scene1.jpg",
        placeholderLabel: "📷 Ảnh cảnh 1 — Tình huống 6"
      },
      {
        id: 2,
        label: "Cảnh 2 / 4",
        speaker: "Bạn (suy nghĩ)",
        speakerType: "ban",
        text: "Trước giờ G 15 phút, bạn bắt gặp anh Hoàng đang lạm quyền và có hành động không đúng với bạn intern trong nhóm. Bạn intern khóc nức nở và rơi vào trạng thái hoảng loạn.",
        imageSrc: "/assets/s6_scene2.jpg",
        placeholderLabel: "📷 Ảnh cảnh 2 — Tình huống 6"
      },
      {
        id: 3,
        label: "Cảnh 3 / 4",
        speaker: "Hoàng",
        speakerType: "thanh",
        text: "Nếu bạn can thiệp mạnh tay yêu cầu xin lỗi công khai: anh Hoàng tự ái bỏ về, sự kiện âm nhạc của hàng ngàn khán giả bị hủy bế tắc, công ty thiệt hại khổng lồ. Nếu nhắm mắt bỏ qua: sự kiện diễn ra êm đẹp nhưng bạn đang tiếp tay cho hành vi vi phạm đạo đức.",
        imageSrc: "/assets/s6_scene3.jpg",
        placeholderLabel: "📷 Ảnh cảnh 3 — Tình huống 6"
      },
      {
        id: 4,
        label: "Cảnh 4 / 4",
        speaker: "Người kể chuyện",
        speakerType: "default",
        text: "Nếu NHẪN NHỊN: Tập trung cho sự kiện diễn ra thành công trước, xử lý mâu thuẫn cá nhân sau. Nếu CAN THIỆP NGAY: Chấm dứt hợp đồng và tố cáo anh Hoàng để bảo vệ lẽ phải, chấp nhận nguy cơ sự kiện vỡ trận.",
        imageSrc: "/assets/s6_scene4.jpg",
        placeholderLabel: "📷 Ảnh cảnh 4 — Tình huống 6"
      }
    ],
    vote: {
      redLabel: "NHẪN NHỊN & TẬP TRUNG SỰ KIỆN",
      redSubtitle: "Tập trung sự kiện thành công trước, xử lý mâu thuẫn sau",
      blueLabel: "CAN THIỆP NGAY & TỐ CÁO",
      blueSubtitle: "Bảo vệ lẽ phải & bạn intern, chấp nhận rủi ro vỡ trận"
    },
    results: {
      redCardHeader: "Nếu NHẪN NHỊN",
      redCardBody: "Sự kiện âm nhạc diễn ra thành công êm đẹp, tránh thiệt hại khổng lồ. Nhưng bạn đã nhắm mắt bỏ qua và tiếp tay cho hành vi coi thường kẻ yếu thế.",
      blueCardHeader: "Nếu CAN THIỆP NGAY",
      blueCardBody: "Bạn đã dũng cảm bảo vệ bạn intern và đứng về phía lẽ phải. Nhưng sự kiện bị hủy bế tắc, gây thiệt hại khổng lồ cho công ty.",
      redProgressLabel: "NHẪN NHỊN (THÀNH CÔNG SỰ KIỆN)",
      blueProgressLabel: "CAN THIỆP NGAY (BẢO VỆ LẼ PHẢI)"
    }
  }
];

// Helper functions to serialize and deserialize vote data safely
// Example format: 5-3_1-0_2-2_0-0_0-0_0-0_4-6 (URL-safe, bypasses IIS block on colons/brackets)
const serializeVotes = (votesObj, finalRed, finalBlue) => {
  const parts = [];
  for (let i = 1; i <= 6; i++) {
    const sc = votesObj[i] || { red: 0, blue: 0 };
    parts.push(`${sc.red}-${sc.blue}`);
  }
  parts.push(`${finalRed}-${finalBlue}`);
  return parts.join('_');
};

const deserializeVotes = (str) => {
  const defaultData = {
    1: { red: 0, blue: 0 },
    2: { red: 0, blue: 0 },
    3: { red: 0, blue: 0 },
    4: { red: 0, blue: 0 },
    5: { red: 0, blue: 0 },
    6: { red: 0, blue: 0 },
    7: { red: 0, blue: 0 }
  };
  
  if (!str || str.trim() === '' || str === 'null' || str.indexOf('_') === -1) {
    return defaultData;
  }
  
  try {
    const parts = str.split('_');
    const data = {};
    for (let i = 1; i <= 7; i++) {
      const scStr = parts[i - 1] || '0-0';
      const [redStr, blueStr] = scStr.split('-');
      data[i] = {
        red: parseInt(redStr, 10) || 0,
        blue: parseInt(blueStr, 10) || 0
      };
    }
    return data;
  } catch (e) {
    console.log("Deserialization failed, fallback to default", e);
    return defaultData;
  }
};

export default function App() {
  // Check if current URL is in Mobile Voter Mode (?voter=true)
  const isVoterUrl = typeof window !== 'undefined' && window.location.search.includes('voter=true');
  const [isVoterMode] = useState(isVoterUrl);

  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  
  // Predictable unique room ID for the current classroom presenter session
  const initialRoomId = searchParams && searchParams.get('room') ? searchParams.get('room') : ('room_' + Math.random().toString(36).substring(2, 8));
  const [roomId] = useState(initialRoomId);

  const voterRoom = searchParams && searchParams.get('room') ? searchParams.get('room') : 'default_room';
  const initialScenarioFromUrl = searchParams && searchParams.get('scenario') ? parseInt(searchParams.get('scenario'), 10) : 1;
  const [selectedVoterScenario, setSelectedVoterScenario] = useState(initialScenarioFromUrl);

  const [scenarioIndex, setScenarioIndex] = useState(0); // 0..5
  const [currentScreen, setCurrentScreen] = useState('landing'); // landing, scene-X, vote, results, final-vote, final-insight
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Track votes across all scenarios
  const [allScenarioVotes, setAllScenarioVotes] = useState({
    1: { red: 0, blue: 0 },
    2: { red: 0, blue: 0 },
    3: { red: 0, blue: 0 },
    4: { red: 0, blue: 0 },
    5: { red: 0, blue: 0 },
    6: { red: 0, blue: 0 }
  });

  // Current scenario active vote state
  const [redVotes, setRedVotes] = useState(0);
  const [blueVotes, setBlueVotes] = useState(0);
  const [popRed, setPopRed] = useState(false);
  const [popBlue, setPopBlue] = useState(false);

  // Final Vote state (TÀI vs ĐỨC)
  const [finalRedVotes, setFinalRedVotes] = useState(0);
  const [finalBlueVotes, setFinalBlueVotes] = useState(0);
  const [finalPopRed, setFinalPopRed] = useState(false);
  const [finalPopBlue, setFinalPopBlue] = useState(false);

  // Mobile Voter state
  const [voterChoice, setVoterChoice] = useState(null); // 'red' or 'blue'
  const [voteFeedback, setVoteFeedback] = useState('');

  const activeScenario = scenariosData[scenarioIndex];

  // Audio ref
  const audioRef = useRef(null);
  const audioStartedRef = useRef(false);

  // BroadcastChannel & Polling refs
  const broadcastChannelRef = useRef(null);
  const pollIntervalRef = useRef(null);
  const voteLockRef = useRef(false);

  // Keep room parameter in presenter URL without reloading
  useEffect(() => {
    if (!isVoterMode && window.history.replaceState) {
      const newUrl = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }
  }, [roomId, isVoterMode]);

  // Play audio on first user click anywhere
  const handleFirstClick = () => {
    if (!audioStartedRef.current && audioRef.current) {
      audioStartedRef.current = true;
      if (audioRef.current.src && audioRef.current.src.trim() !== '') {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleFirstClick, { once: true });
    return () => window.removeEventListener('click', handleFirstClick);
  }, []);

  // REAL-TIME CLOUD & LOCAL SYNC (keyvalue.immanuel.co + BroadcastChannel)
  useEffect(() => {
    // 1. BroadcastChannel setup
    try {
      const bc = new BroadcastChannel('hcm_moral_game_sync');
      broadcastChannelRef.current = bc;

      bc.onmessage = (event) => {
        const data = event.data;
        if (!data) return;

        if (data.type === 'VOTE') {
          handleIncomingRealtimeVote(data.scenarioId, data.choice);
        } else if (data.type === 'FINAL_VOTE') {
          handleIncomingFinalVote(data.choice);
        }
      };
    } catch (e) {
      console.log('BroadcastChannel not supported', e);
    }

    // 2. Cloud key-value sync polling for Presenter screen (Every 1.5 seconds)
    if (!isVoterMode) {
      const fetchVotesFromCloud = async () => {
        try {
          const res = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/hcm_moral_game_v2/${roomId}?t=${Date.now()}`);
          if (!res.ok) return;
          const text = await res.text();
          
          if (!text || text.trim() === '' || text === 'null') {
            // No data yet — just use local zeros, do NOT write to cloud
            // (writing zeros here was overwriting real votes from phones)
            return;
          }

          const data = deserializeVotes(text);

          // Update active scenario counters
          const currentScId = activeScenario.id;
          if (data[currentScId]) {
            setRedVotes((prevRed) => {
              if (data[currentScId].red > prevRed) {
                setPopRed(true);
                setTimeout(() => setPopRed(false), 200);
              }
              return data[currentScId].red;
            });
            setBlueVotes((prevBlue) => {
              if (data[currentScId].blue > prevBlue) {
                setPopBlue(true);
                setTimeout(() => setPopBlue(false), 200);
              }
              return data[currentScId].blue;
            });
          }

          // Sync final scenario votes
          if (data[7]) {
            setFinalRedVotes((prevFinalRed) => {
              if (data[7].red > prevFinalRed) {
                setFinalPopRed(true);
                setTimeout(() => setFinalPopRed(false), 200);
              }
              return data[7].red;
            });
            setFinalBlueVotes((prevFinalBlue) => {
              if (data[7].blue > prevFinalBlue) {
                setFinalPopBlue(true);
                setTimeout(() => setFinalPopBlue(false), 200);
              }
              return data[7].blue;
            });
          }

          // Sync all scenario votes
          setAllScenarioVotes((prevAll) => {
            const newAll = { ...prevAll };
            for (let i = 1; i <= 6; i++) {
              if (data[i]) {
                newAll[i] = { red: data[i].red, blue: data[i].blue };
              }
            }
            return newAll;
          });
        } catch (err) {
          console.log("Cloud polling error: ", err);
        }
      };

      fetchVotesFromCloud();
      pollIntervalRef.current = setInterval(fetchVotesFromCloud, 1500);

      return () => {
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      };
    }
  }, [roomId, isVoterMode, activeScenario.id]);

  // Handle local votes
  const handleIncomingRealtimeVote = (scId, choice) => {
    setAllScenarioVotes(prevAll => {
      const currentVal = prevAll[scId] || { red: 0, blue: 0 };
      const updated = {
        ...currentVal,
        [choice]: currentVal[choice] + 1
      };
      return { ...prevAll, [scId]: updated };
    });

    if (scId === activeScenario.id) {
      if (choice === 'red') {
        setRedVotes(r => r + 1);
        setPopRed(true);
        setTimeout(() => setPopRed(false), 200);
      } else {
        setBlueVotes(b => b + 1);
        setPopBlue(true);
        setTimeout(() => setPopBlue(false), 200);
      }
    }
  };

  const handleIncomingFinalVote = (choice) => {
    if (choice === 'red') {
      setFinalRedVotes(prev => prev + 1);
      setFinalPopRed(true);
      setTimeout(() => setFinalPopRed(false), 200);
    } else {
      setFinalBlueVotes(prev => prev + 1);
      setFinalPopBlue(true);
      setTimeout(() => setFinalPopBlue(false), 200);
    }
  };

  const resetVotes = () => {
    setRedVotes(0);
    setBlueVotes(0);
  };

  const resetFinalVotes = () => {
    setFinalRedVotes(0);
    setFinalBlueVotes(0);
  };

  // Sync vote state when scenarioIndex changes
  useEffect(() => {
    const scId = activeScenario.id;
    const existing = allScenarioVotes[scId] || { red: 0, blue: 0 };
    setRedVotes(existing.red);
    setBlueVotes(existing.blue);
  }, [scenarioIndex]);

  // Typewriter effect handling when entering a scene
  useEffect(() => {
    if (currentScreen.startsWith('scene-')) {
      const sceneNum = parseInt(currentScreen.replace('scene-', ''), 10);
      const sceneObj = activeScenario.scenes[sceneNum - 1];
      if (!sceneObj) return;

      setTypedText('');
      setIsTypingComplete(false);

      let idx = 0;
      const fullText = sceneObj.text;

      const timer = setInterval(() => {
        if (idx < fullText.length) {
          setTypedText(fullText.substring(0, idx + 1));
          idx++;
        } else {
          clearInterval(timer);
          setTypedText(fullText);
          setIsTypingComplete(true);
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [currentScreen, scenarioIndex]);

  // Audio Voiceover player for each scene narration
  useEffect(() => {
    if (currentScreen.startsWith('scene-') && audioRef.current) {
      const sceneNum = parseInt(currentScreen.replace('scene-', ''), 10);
      const scId = activeScenario.id;
      
      try {
        audioRef.current.pause();
        audioRef.current.src = `/HCM2020/TH${scId}/${sceneNum}.mp3`;
        audioRef.current.loop = false;
        audioRef.current.load();
        
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio autoplay deferred until first user interaction:", error);
          });
        }
      } catch (err) {
        console.error("Audio error: ", err);
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentScreen, scenarioIndex]);

  const skipTypewriter = () => {
    if (currentScreen.startsWith('scene-')) {
      const sceneNum = parseInt(currentScreen.replace('scene-', ''), 10);
      const sceneObj = activeScenario.scenes[sceneNum - 1];
      if (!sceneObj) return;
      setTypedText(sceneObj.text);
      setIsTypingComplete(true);
    }
  };

  const handleAdjustVote = async (type, delta) => {
    const scId = activeScenario.id;
    let newRed = redVotes;
    let newBlue = blueVotes;

    if (type === 'red') {
      newRed = Math.max(0, redVotes + delta);
      setRedVotes(newRed);
      setPopRed(true);
      setTimeout(() => setPopRed(false), 200);
    } else {
      newBlue = Math.max(0, blueVotes + delta);
      setBlueVotes(newBlue);
      setPopBlue(true);
      setTimeout(() => setPopBlue(false), 200);
    }

    const updatedVotes = {
      ...allScenarioVotes,
      [scId]: { red: newRed, blue: newBlue }
    };
    setAllScenarioVotes(updatedVotes);

    // Update cloud with safe format
    try {
      const payload = serializeVotes(updatedVotes, finalRedVotes, finalBlueVotes);
      await fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/hcm_moral_game_v2/${roomId}/${payload}?t=${Date.now()}`, { method: 'POST' });
    } catch (e) {
      console.log("Error adjusting vote in cloud: ", e);
    }
  };

  const handleAdjustFinalVote = async (type, delta) => {
    let newRed = finalRedVotes;
    let newBlue = finalBlueVotes;

    if (type === 'red') {
      newRed = Math.max(0, finalRedVotes + delta);
      setFinalRedVotes(newRed);
      setFinalPopRed(true);
      setTimeout(() => setFinalPopRed(false), 200);
    } else {
      newBlue = Math.max(0, finalBlueVotes + delta);
      setFinalBlueVotes(newBlue);
      setFinalPopBlue(true);
      setTimeout(() => setFinalPopBlue(false), 200);
    }

    // Update cloud with safe format
    try {
      const payload = serializeVotes(allScenarioVotes, newRed, newBlue);
      await fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/hcm_moral_game_v2/${roomId}/${payload}?t=${Date.now()}`, { method: 'POST' });
    } catch (e) {
      console.log("Error adjusting final vote in cloud: ", e);
    }
  };

  // Mobile Voter Submit action (with lock to prevent race conditions)
  const handleMobileVoteSubmit = async (scId, choice) => {
    // CRITICAL: Prevent concurrent submissions (race condition protection)
    if (voteLockRef.current) return;
    voteLockRef.current = true;

    try {
      setVoterChoice(choice);
      setVoteFeedback(`✅ Đã gửi phiếu ${choice === 'red' ? '🔴 PHE ĐỎ' : '🔵 PHE XANH'} lên màn hình máy chiếu!`);
      setTimeout(() => setVoteFeedback(''), 4000);

      // 1. Local Broadcast sync
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.postMessage({
          type: scId === 7 ? 'FINAL_VOTE' : 'VOTE',
          scenarioId: scId,
          choice: choice
        });
      }

      // 2. Cloud key-value storage sync (Fetch -> update -> post) in safe format
      const res = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/hcm_moral_game_v2/${voterRoom}?t=${Date.now()}`);
      if (!res.ok) { voteLockRef.current = false; return; }
      const text = await res.text();

      const data = deserializeVotes(text);

      if (scId === 7) {
        data[7][choice] += 1;
      } else {
        if (!data[scId]) data[scId] = { red: 0, blue: 0 };
        data[scId][choice] += 1;
      }

      // Convert back to safe flat string
      const finalRed = data[7]?.red || 0;
      const finalBlue = data[7]?.blue || 0;
      const payload = serializeVotes(data, finalRed, finalBlue);

      // Post to cloud
      await fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/hcm_moral_game_v2/${voterRoom}/${payload}?t=${Date.now()}`, { method: 'POST' });
    } catch (err) {
      console.log("Voter cloud submission error: ", err);
    } finally {
      // Release lock after a small delay to prevent rapid re-taps
      setTimeout(() => { voteLockRef.current = false; }, 800);
    }
  };

  const handleNextScenario = () => {
    if (scenarioIndex < scenariosData.length - 1) {
      setScenarioIndex(prev => prev + 1);
      setCurrentScreen('landing');
    } else {
      setCurrentScreen('final-vote');
    }
  };

  const resetGame = async () => {
    resetVotes();
    resetFinalVotes();
    const initialData = {
      1: { red: 0, blue: 0 },
      2: { red: 0, blue: 0 },
      3: { red: 0, blue: 0 },
      4: { red: 0, blue: 0 },
      5: { red: 0, blue: 0 },
      6: { red: 0, blue: 0 }
    };
    setAllScenarioVotes(initialData);
    setScenarioIndex(0);
    setCurrentScreen('landing');
    setIsDropdownOpen(false);

    // Reset cloud storage with safe format
    try {
      const payload = serializeVotes(initialData, 0, 0);
      await fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/hcm_moral_game_v2/${roomId}/${payload}?t=${Date.now()}`, { method: 'POST' });
    } catch (e) {
      console.log("Error resetting cloud db: ", e);
    }
  };

  const currentBaseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hcm-bl3w.vercel.app';
  const qrVoterUrlForActiveScenario = `${currentBaseUrl}/?voter=true&room=${roomId}&scenario=${activeScenario.id}`;
  const qrVoterUrlForFinalScenario = `${currentBaseUrl}/?voter=true&room=${roomId}&scenario=7`;

  // Vote calculations for scenario vote
  const totalVotes = redVotes + blueVotes;
  const redPercent = totalVotes > 0 ? Math.round((redVotes / totalVotes) * 100) : 50;
  const bluePercent = totalVotes > 0 ? 100 - redPercent : 50;

  // Vote calculations for final vote
  const finalTotalVotes = finalRedVotes + finalBlueVotes;
  const finalRedPercent = finalTotalVotes > 0 ? Math.round((finalRedVotes / finalTotalVotes) * 100) : 50;
  const finalBluePercent = finalTotalVotes > 0 ? 100 - finalRedPercent : 50;

  // =========================================================================
  // IF MOBILE VOTER MODE (?voter=true), RENDER STANDALONE MOBILE VOTING APP
  // =========================================================================
  if (isVoterMode) {
    const activeVoterScenario = selectedVoterScenario <= 6 ? scenariosData[selectedVoterScenario - 1] : null;

    return (
      <div className="mobile-voter-viewport">
        <div className="voter-header">
          <div className="voter-badge">📱 CỔNG BÌNH CHỌN TRỰC TUYẾN</div>
          <h1 className="voter-title">BÌNH CHỌN ĐẠO ĐỨC (HCM GAME)</h1>
          <div className="voter-status">
            <span>🟢 Đã kết nối với máy chiếu lớp học</span>
          </div>
        </div>

        {/* Scenario Selector Tabs for Mobile */}
        <div className="voter-sc-tabs">
          {scenariosData.map((sc) => (
            <button
              key={sc.id}
              className={`voter-tab-btn ${selectedVoterScenario === sc.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedVoterScenario(sc.id);
                setVoterChoice(null);
              }}
            >
              TH {sc.id}
            </button>
          ))}
          <button
            className={`voter-tab-btn final-tab ${selectedVoterScenario === 7 ? 'active' : ''}`}
            onClick={() => {
              setSelectedVoterScenario(7);
              setVoterChoice(null);
            }}
          >
            🎓 Cuối
          </button>
        </div>

        {/* Voter Feedback Alert */}
        {voteFeedback && (
          <div className="voter-feedback-banner">
            {voteFeedback}
          </div>
        )}

        {/* Mobile Voter Content Card */}
        {selectedVoterScenario <= 6 && activeVoterScenario ? (
          <div className="voter-card-container">
            <div className="voter-topic-tag">{activeVoterScenario.topicTitle}</div>

            <div className="voter-options-grid">
              {/* Red Choice */}
              <div
                className={`voter-choice-card red ${voterChoice === 'red' ? 'selected' : ''}`}
                onClick={() => handleMobileVoteSubmit(selectedVoterScenario, 'red')}
              >
                <div className="voter-choice-header">
                  <span className="choice-dot red"></span>
                  <h3>🔴 {activeVoterScenario.vote.redLabel}</h3>
                </div>
                <p className="voter-choice-desc">{activeVoterScenario.vote.redSubtitle}</p>
                <button className="btn-voter-submit red">
                  {voterChoice === 'red' ? '✓ Đã bình chọn (Bấm để chọn lại)' : 'Bấm chọn 🔴 Phe Đỏ'}
                </button>
              </div>

              {/* Blue Choice */}
              <div
                className={`voter-choice-card blue ${voterChoice === 'blue' ? 'selected' : ''}`}
                onClick={() => handleMobileVoteSubmit(selectedVoterScenario, 'blue')}
              >
                <div className="voter-choice-header">
                  <span className="choice-dot blue"></span>
                  <h3>🔵 {activeVoterScenario.vote.blueLabel}</h3>
                </div>
                <p className="voter-choice-desc">{activeVoterScenario.vote.blueSubtitle}</p>
                <button className="btn-voter-submit blue">
                  {voterChoice === 'blue' ? '✓ Đã bình chọn (Bấm để chọn lại)' : 'Bấm chọn 🔵 Phe Xanh'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Final Question Voter View (Tài vs Đức) */
          <div className="voter-card-container">
            <div className="voter-topic-tag">🎓 CÂU HỎI CUỐI: TÀI HAY ĐỨC?</div>
            <p className="voter-final-desc">
              Nếu buộc phải lựa chọn giữa một người có <strong>Tài rất cao nhưng thiếu Đức</strong> và một người có <strong>Đức tốt nhưng năng lực còn hạn chế</strong>, bạn sẽ chọn ai?
            </p>

            <div className="voter-options-grid">
              <div
                className={`voter-choice-card red ${voterChoice === 'red' ? 'selected' : ''}`}
                onClick={() => handleMobileVoteSubmit(7, 'red')}
              >
                <div className="voter-choice-header">
                  <span className="choice-dot red"></span>
                  <h3>🔴 CHỌN TÀI</h3>
                </div>
                <p className="voter-choice-desc">Kết quả và năng lực là yếu tố quyết định để hoàn thành nhiệm vụ.</p>
                <button className="btn-voter-submit red">
                  {voterChoice === 'red' ? '✓ Đã bình chọn (Bấm để chọn lại)' : 'Bấm chọn 🔴 Phe Đỏ (TÀI)'}
                </button>
              </div>

              <div
                className={`voter-choice-card blue ${voterChoice === 'blue' ? 'selected' : ''}`}
                onClick={() => handleMobileVoteSubmit(7, 'blue')}
              >
                <div className="voter-choice-header">
                  <span className="choice-dot blue"></span>
                  <h3>🔵 CHỌN ĐỨC</h3>
                </div>
                <p className="voter-choice-desc">Phẩm chất và trách nhiệm là nền tảng để năng lực được sử dụng đúng.</p>
                <button className="btn-voter-submit blue">
                  {voterChoice === 'blue' ? '✓ Đã bình chọn (Bấm để chọn lại)' : 'Bấm chọn 🔵 Phe Xanh (ĐỨC)'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="voter-footer-note">
          Vui lòng theo dõi kết quả tổng hợp thời gian thực trên màn hình máy chiếu lớp học.
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN PRESENTER APPLICATION VIEW (CLASS / PROJECTOR DISPLAY)
  // =========================================================================
  return (
    <div className="app-viewport" id="app">
      {/* Audio Element */}
      <audio ref={audioRef} id="bgMusic">
        {/* Thay link nhạc nền vào đây: src="URL_NHAC_CUA_BAN" */}
      </audio>

      {/* GLOBAL EXIT BUTTON */}
      {currentScreen !== 'landing' || scenarioIndex > 0 ? (
        <button
          className="btn-exit-sm"
          onClick={resetGame}
          title="Thoát về trang đầu Tình huống 1"
        >
          ✕ Thoát
        </button>
      ) : null}

      {/* QUICK SCENARIO SELECTOR OVERLAY / DROPDOWN MENU */}
      {isDropdownOpen && (
        <div className="scenario-dropdown-overlay" onClick={() => setIsDropdownOpen(false)}>
          <div className="scenario-dropdown-menu" onClick={(e) => e.stopPropagation()}>
            <div className="dropdown-header">
              <span>CHỌN TÌNH HUỐNG TRÌNH CHIẾU</span>
              <button className="dropdown-close-btn" onClick={() => setIsDropdownOpen(false)}>✕</button>
            </div>
            <div className="dropdown-items-list">
              {scenariosData.map((sc, idx) => (
                <div
                  key={sc.id}
                  className={`dropdown-item ${idx === scenarioIndex && currentScreen !== 'final-vote' && currentScreen !== 'final-insight' ? 'active' : ''}`}
                  onClick={() => {
                    setScenarioIndex(idx);
                    setCurrentScreen('landing');
                    setIsDropdownOpen(false);
                  }}
                >
                  <span className="dropdown-item-title">{sc.topicTitle}</span>
                  <span className="dropdown-item-arrow">►</span>
                </div>
              ))}
              <div
                className={`dropdown-item final-item ${currentScreen === 'final-vote' || currentScreen === 'final-insight' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentScreen('final-vote');
                  setIsDropdownOpen(false);
                }}
              >
                <span className="dropdown-item-title">🎓 CÂU HỎI CUỐI & LEARNING INSIGHT</span>
                <span className="dropdown-item-arrow">►</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === SCREEN 1: LANDING === */}
      <div id="screen-landing" className={`screen ${currentScreen === 'landing' ? 'active' : ''}`}>
        <div className="landing-content">
          <div
            className="game-badge clickable"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            title="Bấm vào đây để chọn nhanh Tình huống"
          >
            {activeScenario.topicTitle} <span className="tag-arrow">▼</span>
          </div>
          <h1 className="main-title">ĐỨC HAY TÀI?</h1>
          <p className="subtitle">{activeScenario.landingSubtitle}</p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-glow" onClick={() => setCurrentScreen('scene-1')}>
              <span>Bắt đầu tình huống</span>
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* === SCREENS 2–5: STORY SCENES === */}
      {activeScenario.scenes.map((scene) => {
        const screenKey = `scene-${scene.id}`;
        const isActive = currentScreen === screenKey;

        return (
          <div key={screenKey} id={`screen-${scene.id + 1}`} className={`screen story-scene ${isActive ? 'active' : ''}`}>
            <div className="scene-image-wrapper">
              {scene.imageSrc ? (
                <img
                  src={scene.imageSrc}
                  alt={scene.label}
                  className="scene-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="image-placeholder" style={{ display: scene.imageSrc ? 'none' : 'flex' }}>
                <div className="placeholder-content">
                  <span className="camera-icon">📷</span>
                  <p>{scene.placeholderLabel}</p>
                </div>
              </div>
            </div>

            <div className="scene-overlay"></div>
            
            {/* CLICKABLE SCENE HEADER TAG FOR SCENARIO SELECTION */}
            <div
              className="scene-header-tag clickable"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              title="Bấm vào đây để chọn nhanh Tình huống khác"
            >
              {activeScenario.topicTitle} • {scene.label} <span className="tag-arrow">▼</span>
            </div>

            <div className="scene-body">
              <div className={`speaker-tag ${scene.speakerType}`}>{scene.speaker}</div>
              <div className="dialogue-box">
                <p className="dialogue-text" onClick={skipTypewriter}>
                  {typedText}
                  {!isTypingComplete && <span className="typewriter-cursor"></span>}
                </p>
              </div>

              <div className="scene-controls" style={{ justifyContent: 'space-between' }}>
                <button
                  className="btn btn-back"
                  onClick={() => setCurrentScreen(scene.id === 1 ? 'landing' : `scene-${scene.id - 1}`)}
                >
                  <span>← Quay lại</span>
                </button>

                <div className={`btn-continue-wrapper ${isTypingComplete ? 'visible' : ''}`}>
                  {scene.id < 4 ? (
                    <button className="btn btn-next" onClick={() => setCurrentScreen(`scene-${scene.id + 1}`)}>
                      <span>Tiếp tục</span>
                      <span className="btn-icon">→</span>
                    </button>
                  ) : (
                    <button className="btn btn-glow" onClick={() => setCurrentScreen('vote')}>
                      <span>Vào phần Bình Chọn</span>
                      <span className="btn-icon">→</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* === SCREEN 6: VOTE SCREEN WITH CLEAN ENLARGED SVG QR CODE === */}
      <div id="screen-vote" className={`screen ${currentScreen === 'vote' ? 'active' : ''}`}>
        <button
          className="btn btn-back btn-back-sm"
          style={{ position: 'absolute', top: 18, left: 20, zIndex: 40 }}
          onClick={() => setCurrentScreen('scene-4')}
        >
          <span>← Xem lại tình huống</span>
        </button>

        <div className="vote-split-container">
          {/* Left Side: Red */}
          <div className="vote-side left">
            <div className="side-header">
              <h2 className="side-label">{activeScenario.vote.redLabel}</h2>
              <p className="side-subtitle">{activeScenario.vote.redSubtitle}</p>
            </div>

            <div className={`vote-count-display ${popRed ? 'pop' : ''}`}>
              {redVotes}
            </div>

            <div className="vote-actions">
              <button className="btn-vote-sub" onClick={() => handleAdjustVote('red', -1)} title="Giảm 1 phiếu">-</button>
              <button className="btn btn-red btn-vote-add" onClick={() => handleAdjustVote('red', 1)}>
                <span>+1 Phiếu</span>
              </button>
            </div>
          </div>

          {/* CENTER PANEL WITH DIRECT ENLARGED SVG QR CODE & VS DIVIDER */}
          <div className="vs-center-container">
            <div className="vs-divider">VS</div>

            {/* ENLARGED CLEAN SVG QR CODE CARD (NO EXTRA TEXT) */}
            <div className="qr-inline-card">
              <div className="qr-inline-img-box">
                <QRCodeSVG
                  value={qrVoterUrlForActiveScenario}
                  size={230}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="L"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Blue */}
          <div className="vote-side right">
            <div className="side-header">
              <h2 className="side-label">{activeScenario.vote.blueLabel}</h2>
              <p className="side-subtitle">{activeScenario.vote.blueSubtitle}</p>
            </div>

            <div className={`vote-count-display ${popBlue ? 'pop' : ''}`}>
              {blueVotes}
            </div>

            <div className="vote-actions">
              <button className="btn-vote-sub" onClick={() => handleAdjustVote('blue', -1)} title="Giảm 1 phiếu">-</button>
              <button className="btn btn-blue btn-vote-add" onClick={() => handleAdjustVote('blue', 1)}>
                <span>+1 Phiếu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Progress & Results Bar */}
        <div className="vote-footer-bar">
          <div className="live-progress-container">
            <div className="live-progress-red" style={{ width: `${redPercent}%` }}></div>
            <div className="live-progress-blue" style={{ width: `${bluePercent}%` }}></div>
          </div>
          <div className="vote-footer-info">
            <div className="total-votes-text">
              Tổng số phiếu: <span className="total-votes-count">{totalVotes}</span>
            </div>

            <button
              className={`btn btn-glow btn-view-results ${totalVotes > 0 ? 'ready' : ''}`}
              onClick={() => setCurrentScreen('results')}
            >
              <span>Xem kết quả</span>
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* === SCREEN 7: RESULTS === */}
      <div id="screen-results" className={`screen ${currentScreen === 'results' ? 'active' : ''}`}>
        <div className="results-container">
          <div className="results-header">
            <h2 className="results-title">KẾT QUẢ BÌNH CHỌN — {activeScenario.topicTitle}</h2>
          </div>

          <div className="results-bars-wrapper">
            <div className="result-bar-item">
              <div className="result-bar-meta red">
                <span>{activeScenario.results.redProgressLabel}</span>
                <span>{redPercent}% ({redVotes} phiếu)</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill red" style={{ width: `${redPercent}%` }}></div>
              </div>
            </div>

            <div className="result-bar-item">
              <div className="result-bar-meta blue">
                <span>{activeScenario.results.blueProgressLabel}</span>
                <span>{bluePercent}% ({blueVotes} phiếu)</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill blue" style={{ width: `${bluePercent}%` }}></div>
              </div>
            </div>
          </div>

          {/* Consequence Cards */}
          <div className="cards-grid">
            <div className={`consequence-card red-card ${currentScreen === 'results' ? 'visible' : ''}`}>
              <div className="card-header">
                <span>{activeScenario.results.redCardHeader}</span>
              </div>
              <div className="card-body">
                {activeScenario.results.redCardBody}
              </div>
            </div>

            <div className={`consequence-card blue-card ${currentScreen === 'results' ? 'visible' : ''}`}>
              <div className="card-header">
                <span>{activeScenario.results.blueCardHeader}</span>
              </div>
              <div className="card-body">
                {activeScenario.results.blueCardBody}
              </div>
            </div>
          </div>

          <div className="results-footer" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button className="btn btn-back" onClick={() => setCurrentScreen('vote')}>
              <span>← Quay lại bình chọn</span>
            </button>
            {scenarioIndex < scenariosData.length - 1 ? (
              <button className="btn btn-glow" onClick={handleNextScenario}>
                <span>Chơi tiếp (Tình huống {scenarioIndex + 2}) →</span>
              </button>
            ) : (
              <button className="btn btn-glow" onClick={() => setCurrentScreen('final-vote')}>
                <span>Tổng kết & Câu hỏi cuối →</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* === SCREEN 8: FINAL VOTE (CÂU HỎI CUỐI: TÀI HAY ĐỨC?) WITH ENLARGED CLEAN SVG QR === */}
      <div id="screen-final-vote" className={`screen ${currentScreen === 'final-vote' ? 'active' : ''}`}>
        <button
          className="btn btn-back btn-back-sm"
          style={{ position: 'absolute', top: 18, left: 20, zIndex: 40 }}
          onClick={() => setCurrentScreen('results')}
        >
          <span>← Quay lại kết quả Tình huống 6</span>
        </button>

        <div className="final-vote-header">
          <div className="final-badge">ĐÚC KẾT TOÀN BỘ GAME</div>
          <h2 className="final-title">CÂU HỎI CUỐI: TÀI HAY ĐỨC?</h2>
          <p className="final-question-desc">
            Sau 6 tình huống, cả lớp được hỏi lần cuối:<br />
            <strong>"Nếu buộc phải lựa chọn giữa một người có Tài rất cao nhưng thiếu Đức và một người có Đức tốt nhưng năng lực còn hạn chế, bạn sẽ chọn ai?"</strong>
          </p>
        </div>

        <div className="vote-split-container final-split">
          {/* Left Side: Red (TÀI) */}
          <div className="vote-side left">
            <div className="side-header">
              <h2 className="side-label">🔴 CHỌN TÀI</h2>
              <p className="side-subtitle">Kết quả và năng lực là yếu tố quyết định để hoàn thành nhiệm vụ.</p>
            </div>

            <div className={`vote-count-display ${finalPopRed ? 'pop' : ''}`}>
              {finalRedVotes}
            </div>

            <div className="vote-actions">
              <button className="btn-vote-sub" onClick={() => handleAdjustFinalVote('red', -1)} title="Giảm 1 phiếu">-</button>
              <button className="btn btn-red btn-vote-add" onClick={() => handleAdjustFinalVote('red', 1)}>
                <span>+1 Phiếu</span>
              </button>
            </div>
          </div>

          {/* CENTER PANEL WITH DIRECT ENLARGED SVG QR CODE FOR FINAL QUESTION */}
          <div className="vs-center-container">
            <div className="vs-divider">VS</div>

            <div className="qr-inline-card">
              <div className="qr-inline-img-box">
                <QRCodeSVG
                  value={qrVoterUrlForFinalScenario}
                  size={230}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="L"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Blue (ĐỨC) */}
          <div className="vote-side right">
            <div className="side-header">
              <h2 className="side-label">🔵 CHỌN ĐỨC</h2>
              <p className="side-subtitle">Phẩm chất và trách nhiệm là nền tảng để năng lực được sử dụng đúng.</p>
            </div>

            <div className={`vote-count-display ${finalPopBlue ? 'pop' : ''}`}>
              {finalBlueVotes}
            </div>

            <div className="vote-actions">
              <button className="btn-vote-sub" onClick={() => handleAdjustFinalVote('blue', -1)} title="Giảm 1 phiếu">-</button>
              <button className="btn btn-blue btn-vote-add" onClick={() => handleAdjustFinalVote('blue', 1)}>
                <span>+1 Phiếu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Progress & Next to Insight */}
        <div className="vote-footer-bar">
          <div className="live-progress-container">
            <div className="live-progress-red" style={{ width: `${finalRedPercent}%` }}></div>
            <div className="live-progress-blue" style={{ width: `${finalBluePercent}%` }}></div>
          </div>
          <div className="vote-footer-info">
            <div className="total-votes-text">
              Tổng phiếu bình chọn cuối: <span className="total-votes-count">{finalTotalVotes}</span> (🔴 {finalRedPercent}% | 🔵 {finalBluePercent}%)
            </div>

            <button
              className="btn btn-glow ready"
              onClick={() => setCurrentScreen('final-insight')}
            >
              <span>Xem Đúc Kết & Bài Học Cuối Game →</span>
            </button>
          </div>
        </div>
      </div>

      {/* === SCREEN 9: FINAL SUMMARY & CONCLUSION MESSAGE === */}
      <div id="screen-final-insight" className={`screen ${currentScreen === 'final-insight' ? 'active' : ''}`}>
        <div className="final-insight-container">
          <div className="insight-top-header">
            <div className="insight-badge">ĐÚC KẾT TOÀN BỘ GAME & THÔNG ĐIỆP KẾT LUẬN</div>
            <h1 className="insight-main-title">BẢNG TỔNG KẾT BÌNH CHỌN & THÔNG ĐIỆP BÀI HỌC</h1>
          </div>

          {/* DASHBOARD SUMMARY OF ALL 6 SCENARIOS + FINAL QUESTION */}
          <div className="summary-dashboard">
            <h2 className="dashboard-title">📊 TỔNG CÁC LƯỢT ĐÁNH GIÁ TỪ TÌNH HUỐNG 1 ĐẾN 6</h2>
            <div className="summary-grid">
              {scenariosData.map((sc) => {
                const votes = allScenarioVotes[sc.id] || { red: 0, blue: 0 };
                const scTotal = votes.red + votes.blue;
                const scRedPct = scTotal > 0 ? Math.round((votes.red / scTotal) * 100) : 50;
                const scBluePct = scTotal > 0 ? 100 - scRedPct : 50;

                return (
                  <div key={sc.id} className="summary-sc-card">
                    <div className="summary-sc-header">
                      <span className="sc-badge-mini">{sc.badge}</span>
                      <span className="sc-title-mini">{sc.title}</span>
                    </div>
                    <div className="summary-sc-bars">
                      <div className="summary-bar-row red">
                        <span>🔴 {sc.vote.redLabel}</span>
                        <span>{scRedPct}% ({votes.red} phiếu)</span>
                      </div>
                      <div className="summary-bar-track">
                        <div className="summary-bar-fill red" style={{ width: `${scRedPct}%` }}></div>
                      </div>

                      <div className="summary-bar-row blue">
                        <span>🔵 {sc.vote.blueLabel}</span>
                        <span>{scBluePct}% ({votes.blue} phiếu)</span>
                      </div>
                      <div className="summary-bar-track">
                        <div className="summary-bar-fill blue" style={{ width: `${scBluePct}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Final Question Vote Result Banner */}
            <div className="final-question-summary-banner">
              <div className="fq-title">🎓 CÂU HỎI CUỐI: TÀI HAY ĐỨC?</div>
              <div className="fq-results">
                <span>🔴 CHỌN TÀI: {finalRedPercent}% ({finalRedVotes} phiếu)</span>
                <span>🔵 CHỌN ĐỨC: {finalBluePercent}% ({finalBlueVotes} phiếu)</span>
              </div>
            </div>
          </div>

          {/* 5. THÔNG ĐIỆP KẾT LUẬN (CHỐT BÀI LUÔN HIỂN THỊ CUỐI CÙNG) */}
          <div className="conclusion-section">
            <h2 className="conclusion-title">5. THÔNG ĐIỆP KẾT LUẬN (CHỐT BÀI LUÔN HIỂN THỊ CUỐI CÙNG)</h2>

            <div className="conclusion-cards-grid">
              {/* Card A: HCM Thought */}
              <div className="insight-card hcm-card">
                <div className="insight-card-header">
                  <span className="card-icon">📜</span>
                  <h3>TƯ TƯỞNG HỒ CHÍ MINH VỀ TÀI VÀ ĐỨC</h3>
                </div>
                <div className="insight-card-content">
                  <div className="highlight-quote gold-quote">
                    "Theo tư tưởng Hồ Chí Minh: 'Có tài mà không có đức là người vô dụng, có đức mà không có tài thì làm việc gì cũng khó.'"
                  </div>
                </div>
              </div>

              {/* Card B: Core Lesson Learned */}
              <div className="insight-card lesson-card">
                <div className="insight-card-header">
                  <span className="card-icon">💡</span>
                  <h3>BÀI HỌC RÚT RA</h3>
                </div>
                <div className="insight-card-content">
                  <div className="highlight-quote green-quote">
                    "Một người ưu tú cần có đủ ĐỨC (dám lên tiếng bảo vệ lẽ phải) và TÀI (có năng lực, sự khéo léo để giải quyết vấn đề mà không làm đổ vỡ công sức của tập thể)."
                  </div>
                </div>
              </div>
            </div>

            {/* Card C: Practical Utility & Human Value */}
            <div className="insight-card full-width-insight-card">
              <div className="insight-card-header">
                <span className="card-icon">⭐</span>
                <h3>LEARNING INSIGHT & VẬN DỤNG THỰC TIỄN</h3>
              </div>
              <div className="insight-card-content">
                <p>Câu hỏi về <strong>Tài và Đức</strong> không nên được hiểu đơn giản là lựa chọn một bỏ một.</p>
                <p>Qua 6 tình huống, có thể thấy <strong>năng lực</strong> giúp con người hoàn thành công việc, nhưng <strong>phẩm chất đạo đức</strong> định hướng cách năng lực đó được sử dụng.</p>
                <div className="highlight-quote blue-quote">
                  "Vì vậy, giá trị của một con người không chỉ nằm ở việc có giỏi hay không, mà còn ở việc sử dụng cái giỏi đó như thế nào và vì ai."
                </div>
              </div>
            </div>
          </div>

          <div className="final-insight-footer">
            <button className="btn btn-back" onClick={() => setCurrentScreen('final-vote')}>
              <span>← Quay lại bình chọn cuối</span>
            </button>
            <button className="btn btn-glow" onClick={resetGame}>
              <span>Chơi lại từ đầu (Về Tình huống 1)</span>
              <span className="btn-icon">↺</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
