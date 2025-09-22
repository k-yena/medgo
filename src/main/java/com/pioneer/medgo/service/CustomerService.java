package com.pioneer.medgo.service;

import com.pioneer.medgo.dao.MedicineDAO;
import com.pioneer.medgo.dao.PharmacyDAO;
import com.pioneer.medgo.domain.MedicineDTO;
import com.pioneer.medgo.domain.PharmacyDTO;
import com.pioneer.medgo.util.GeoUtil;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
  private final PharmacyDAO pharmacyDAO;
  private final MedicineDAO medicineDAO;

  public CustomerService(MedicineDAO medicineDAO, PharmacyDAO pharmacyDAO) {
    this.medicineDAO = medicineDAO;
    this.pharmacyDAO = pharmacyDAO;
  }

  public static final double nearDistance = 1.0;

  // 반경 nearDistance 키로 이내의 주변 약국 검색
  public List<PharmacyDTO> nearbyPharmacyList(double latitude, double longitude, String keyword) {
    GeoUtil.Box box = GeoUtil.boundingBox(latitude, longitude, nearDistance);
    double minLat = box.getMinLat();
    double maxLat = box.getMaxLat();
    double minLon = box.getMinLon();
    double maxLon = box.getMaxLon();

    List<PharmacyDTO> list =
        pharmacyDAO.findByLessThanLatAndLon(minLat, maxLat, minLon, maxLon, keyword);

    for (PharmacyDTO p : list) {
      double d = GeoUtil.distanceMeters(latitude, longitude, p.getLatitude(), p.getLongitude());
      p.setDistance(d);
    }
    list =
        list.stream()
            .filter(p -> p.getDistance() <= nearDistance * 1000.0)
            .sorted(Comparator.comparingDouble(PharmacyDTO::getDistance))
            .collect(Collectors.toList());

    return list;
  }

  public List<MedicineDTO> comparatorMedicineList(String keyword) {
    System.out.println(keyword + "  service");
    List<MedicineDTO> list = medicineDAO.findComparatorAllByKeyword(keyword);

    return list;
  }

  public List<String> searchMedName(String keyword) {
    List<String> list = medicineDAO.findMedNameByKeyword(keyword);
    return list;
  }
}
