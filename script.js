// =======================
// FLIPBOOK + VIDEO OVERLAY CONTROL
// =======================

$(".flipbook").turn({
    when: {
        turned: function (e, page) {

            // Ẩn video khi đổi trang
            const vc = document.getElementById("video-container");
            vc.style.display = "none";

            // Kiểm tra trang có video không
            const pageEl = $(".flipbook .page").eq(page - 1);
            const videoId = pageEl.data("video");

            if (videoId) {
                const rect = pageEl[0].getBoundingClientRect();

                // Đặt video overlay đúng vị trí
                vc.style.left = rect.left + "px";
                vc.style.top = rect.top + "px";
                vc.style.display = "block";

                const video = document.getElementById(videoId);
                const seek = document.getElementById("seek1");

                // Reset video
                video.currentTime = 0;
                video.play();

                // Seekbar max theo giây
                seek.max = Math.floor(video.duration * 10);

                // Seekbar kéo -> tua video
                seek.oninput = () => {
                    video.currentTime = seek.value / 10;
                    video.play();
                };

                // Cập nhật seekbar theo thời gian
                function updateSeek() {
                    if (!video.paused) {
                        seek.value = Math.floor(video.currentTime * 10);
                    }
                    requestAnimationFrame(updateSeek);
                }
                updateSeek();
            }
        }
    }
});
