#!/bin/bash
set -e

IMAGE_NAME="uit-assistance"
TAG="${1:-latest}"
TAR_FILE="uit-assistance-${TAG}.tar"

echo "=========================================="
echo "🐳 Đang đóng gói (Capture) Docker Image: ${IMAGE_NAME}:${TAG}..."
echo "=========================================="

docker build -t "${IMAGE_NAME}:${TAG}" .

echo "✅ Build Docker Image thành công: ${IMAGE_NAME}:${TAG}"

# Tùy chọn lưu ra file tar nếu truyền cờ --export hoặc -e
if [[ "$*" == *"--export"* ]] || [[ "$*" == *"-e"* ]]; then
  echo "📦 Đang xuất Docker Image ra file ${TAR_FILE}..."
  docker save -o "${TAR_FILE}" "${IMAGE_NAME}:${TAG}"
  echo "✅ Đã lưu image thành công: ${TAR_FILE} ($(du -h "${TAR_FILE}" | cut -f1))"
fi

echo "=========================================="
echo "👉 Sẵn sàng chạy với: ./scripts/run-image.sh hoặc pnpm docker:run"
echo "=========================================="
