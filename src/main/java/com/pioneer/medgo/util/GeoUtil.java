package com.pioneer.medgo.util;

public final class GeoUtil {
    private static final double EARTH_RADIUS_KM = 6371.0; // 평균 지구 반지름 (km)

    private GeoUtil() {}

    /**
     * 위도 1도당 거리 (km)
     */
    public static double kmPerLatDegree() {
        return EARTH_RADIUS_KM * Math.PI / 180.0;
    }

    /**
     * 경도 1도당 거리 (km)
     * @param latitude 중심 위도 (degree)
     */
    public static double kmPerLonDegree(double latitude) {
        return EARTH_RADIUS_KM * Math.PI / 180.0 * Math.cos(Math.toRadians(latitude));
    }

    /**
     * 두 위경도 간 거리 (Haversine 공식, 결과 m 단위)
     */
    public static double distanceMeters(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double rLat1 = Math.toRadians(lat1);
        double rLat2 = Math.toRadians(lat2);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(rLat1) * Math.cos(rLat2)
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        return 2 * EARTH_RADIUS_KM * 1000 * Math.asin(Math.sqrt(a));
    }

    /**
     * 중심 좌표(lat, lon)와 반경(km)을 넣으면 바운딩 박스(min/max) 반환
     */
    public static Box boundingBox(double lat, double lon, double radiusKm) {
        double dLat = radiusKm / kmPerLatDegree();
        double dLon = radiusKm / kmPerLonDegree(lat);

        double minLat = lat - dLat;
        double maxLat = lat + dLat;
        double minLon = lon - dLon;
        double maxLon = lon + dLon;

        return new Box(minLat, maxLat, minLon, maxLon);
    }

    /**
     * 바운딩 박스 결과를 담는 클래스 
     */
    public static class Box {
        private final double minLat;
        private final double maxLat;
        private final double minLon;
        private final double maxLon;

        public Box(double minLat, double maxLat, double minLon, double maxLon) {
            this.minLat = minLat;
            this.maxLat = maxLat;
            this.minLon = minLon;
            this.maxLon = maxLon;
        }

        public double getMinLat() { return minLat; }
        public double getMaxLat() { return maxLat; }
        public double getMinLon() { return minLon; }
        public double getMaxLon() { return maxLon; }
    }
}
