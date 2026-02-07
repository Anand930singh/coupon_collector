package com.coupon.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record ExtractRequestDto(
        @NotBlank(message = "Prompt is required")
        String prompt
) {
}
