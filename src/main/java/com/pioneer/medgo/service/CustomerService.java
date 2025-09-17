package com.pioneer.medgo.service;

import com.pioneer.medgo.dao.NoticeDAO;
import com.pioneer.medgo.dao.PharmacyDAO;
import com.pioneer.medgo.domain.PharmacyDTO;
import com.pioneer.medgo.util.GeoUtil;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
  private final PharmacyDAO pharmacyDAO;
  private final NoticeDAO noticeDAO;

  public CustomerService(NoticeDAO noticeDAO, PharmacyDAO pharmacyDAO) {
    this.noticeDAO = noticeDAO;
    this.pharmacyDAO = pharmacyDAO;
  }

  public static final double nearDistance = 1.0;

  // 반경 nearDistance 키로 이내의 주변 약국 검색
  public List<PharmacyDTO> nearbyPharmacyList(double latitude, double longitude) {
    //		System.out.println("s - 1");
    //		System.out.println("내 좌표 : " + latitude + "     " + longitude);
    GeoUtil.Box box = GeoUtil.boundingBox(latitude, longitude, nearDistance);
    double minLat = box.getMinLat();
    double maxLat = box.getMaxLat();
    double minLon = box.getMinLon();
    double maxLon = box.getMaxLon();
    //		System.out.println("좌표");
    //		System.out.println(minLat);
    //		System.out.println(maxLat);
    //		System.out.println(minLon);
    //		System.out.println(maxLon);
    //		System.out.println();
    //		System.out.println("s - 2");

    List<PharmacyDTO> list = pharmacyDAO.findByLessThanLatAndLon(minLat, maxLat, minLon, maxLon);
    //		for (PharmacyDTO p : list) {
    //			System.out.println(p.toString());
    //		}
    //		System.out.println("s - 3");

    for (PharmacyDTO p : list) {
      double d = GeoUtil.distanceMeters(latitude, longitude, p.getLatitude(), p.getLongitude());
      p.setDistance(d);
      //			System.out.println(p.getDistance());
    }
    list =
        list.stream()
            .filter(p -> p.getDistance() <= nearDistance * 1000.0)
            .sorted(Comparator.comparingDouble(PharmacyDTO::getDistance))
            .collect(Collectors.toList());
    //		for (PharmacyDTO p : list) {
    //			System.out.println(p.toString());
    //		}

    return list;
  }
}
