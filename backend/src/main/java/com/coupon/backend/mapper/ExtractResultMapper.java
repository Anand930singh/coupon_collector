package com.coupon.backend.mapper;

import com.coupon.backend.dto.CouponRequestDto;
import com.coupon.backend.enums.DiscountType;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Map;

@Component
public class ExtractResultMapper {

    /**
     * Converts the extracted JSON map (from Gemini) to CouponRequestDto.
     */
    public CouponRequestDto toCouponRequestDto(Map<String, Object> map) {
        if (map == null) {
            return null;
        }
        LocalDate validFrom = getLocalDate(map, "validFrom");
        if (validFrom == null) {
            validFrom = LocalDate.now();
        }
        return new CouponRequestDto(
                getString(map, "title"),
                getString(map, "description"),
                getString(map, "code"),
                getString(map, "platform"),
                getString(map, "category"),
                getDiscountType(map, "discountType"),
                getBigDecimal(map, "discountValue"),
                getBigDecimal(map, "minOrderValue"),
                getBigDecimal(map, "maxDiscountValue"),
                validFrom,
                getLocalDate(map, "validTill"),
                getString(map, "terms"),
                getBoolean(map, "requiresUniqueUser"),
                getString(map, "usageType"),
                getString(map, "geoRestriction"),
                getBoolean(map, "isActive"),
                getInteger(map, "totalQuantity"),
                getBigDecimal(map, "price"),
                getBoolean(map, "isFree")
        );
    }

    private static String getString(Map<String, Object> map, String key) {
        Object v = map.get(key);
        return v == null ? null : v.toString().trim();
    }

    private static Boolean getBoolean(Map<String, Object> map, String key) {
        Object v = map.get(key);
        if (v == null) return null;
        if (v instanceof Boolean b) return b;
        if (v instanceof String s) return Boolean.parseBoolean(s);
        return null;
    }

    private static Integer getInteger(Map<String, Object> map, String key) {
        Object v = map.get(key);
        if (v == null) return null;
        if (v instanceof Number n) return n.intValue();
        if (v instanceof String s) {
            try {
                return Integer.parseInt(s);
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return null;
    }

    private static BigDecimal getBigDecimal(Map<String, Object> map, String key) {
        Object v = map.get(key);
        if (v == null) return null;
        if (v instanceof Number n) return BigDecimal.valueOf(n.doubleValue());
        if (v instanceof String s) {
            try {
                return new BigDecimal(s.trim());
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return null;
    }

    private static LocalDate getLocalDate(Map<String, Object> map, String key) {
        Object v = map.get(key);
        if (v == null) return null;
        if (v instanceof LocalDate d) return d;
        String s = v.toString().trim();
        if (s.isEmpty()) return null;
        try {
            return LocalDate.parse(s);
        } catch (DateTimeParseException e) {
            return null;
        }
    }

    private static DiscountType getDiscountType(Map<String, Object> map, String key) {
        Object v = map.get(key);
        if (v == null) return null;
        String s = v.toString().trim().toUpperCase();
        if (s.isEmpty()) return null;
        try {
            return DiscountType.valueOf(s);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
