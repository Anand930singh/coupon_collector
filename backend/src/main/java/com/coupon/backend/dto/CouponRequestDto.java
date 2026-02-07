package com.coupon.backend.dto;

import com.coupon.backend.enums.DiscountType;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CouponRequestDto(
        String title,
        String description,
        String code,
        String platform,
        String category,
        DiscountType discountType,
        BigDecimal discountValue,
        BigDecimal minOrderValue,
        BigDecimal maxDiscountValue,
        LocalDate validFrom,
        LocalDate validTill,
        String terms,
        Boolean requiresUniqueUser,
        String usageType,
        String geoRestriction,
        Boolean isActive,
        Integer totalQuantity,
        BigDecimal price,
        Boolean isFree
) {
}
