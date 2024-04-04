#include <stdlib.h>
#include <emmintrin.h> // Include SIMD intrinsics header

float* mat4_multiply(float* out, const float* a, const float* b) {
    __m128 row1 = _mm_loadu_ps(&a[0]);
    __m128 row2 = _mm_loadu_ps(&a[4]);
    __m128 row3 = _mm_loadu_ps(&a[8]);
    __m128 row4 = _mm_loadu_ps(&a[12]);

    for (int i = 0; i < 4; ++i) {
        __m128 brod1 = _mm_set1_ps(b[i * 4]);
        __m128 brod2 = _mm_set1_ps(b[i * 4 + 1]);
        __m128 brod3 = _mm_set1_ps(b[i * 4 + 2]);
        __m128 brod4 = _mm_set1_ps(b[i * 4 + 3]);
        __m128 row = _mm_add_ps(
            _mm_add_ps(
                _mm_mul_ps(brod1, row1),
                _mm_mul_ps(brod2, row2)),
            _mm_add_ps(
                _mm_mul_ps(brod3, row3),
                _mm_mul_ps(brod4, row4)));
        _mm_storeu_ps(&out[i * 4], row);
    }
    return out;
}