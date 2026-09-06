#!/bin/bash
set -e

IMAGE_NAME="uit-assistance"
PORT="${PORT:-3000}"
TAG="latest"

# Hỗ trợ truyền port qua tham số: ./run-image.sh 3001
for arg in "$@"; do
  if [[ "$arg" =~ ^[0-9]+$ ]]; then
    PORT="$arg"
  elif [[ "$arg" != "" ]]; then
    TAG="$arg"
  fi
done

echo "=========================================="
echo "🚀 Khởi chạy Container từ Image: ${IMAGE_NAME}:${TAG}..."
echo "=========================================="

# Kiểm tra và xóa container cũ nếu đang chạy
if [ "$(docker ps -aq -f name=^/${CONTAINER_NAME}$)" ]; then
  echo "⚠️ Đang dừng và xóa container cũ [${CONTAINER_NAME}]..."
  docker rm -f "${CONTAINER_NAME}" >/dev/null 2>&1 || true
fi

# Kiểm tra file biến môi trường
ENV_FLAG=""
if [ -f ".env.local" ]; then
  echo "🔑 Sử dụng cấu hình từ file .env.local"
  ENV_FLAG="--env-file .env.local"
elif [ -f ".env" ]; then
  echo "🔑 Sử dụng cấu hình từ file .env"
  ENV_FLAG="--env-file .env"
fi

# Chạy container
docker run -d \
  --name "${CONTAINER_NAME}" \
  -p "${PORT}:3000" \
  ${ENV_FLAG} \
  "${IMAGE_NAME}:${TAG}"

echo "=========================================="
echo "✅ Container [${CONTAINER_NAME}] đang chạy thành công!"
echo "👉 Truy cập ứng dụng tại: http://localhost:${PORT}"
echo "📋 Xem logs thời gian thực: docker logs -f ${CONTAINER_NAME}"
echo "🛑 Dừng container: docker stop ${CONTAINER_NAME}"
echo "=========================================="
