package com.pioneer.medgo.service;

import org.springframework.stereotype.Service;

import com.pioneer.medgo.dao.MemberDAO;
import com.pioneer.medgo.dao.PharmacyDAO;
import com.pioneer.medgo.domain.MemberDTO;
import com.pioneer.medgo.domain.MypageDTO;
import com.pioneer.medgo.domain.PharmacyDTO;

@Service
public class MypageService {
	
	private final MemberDAO memberDAO;

	private final PharmacyDAO pharmacyDAO;
	
	public MypageService(PharmacyDAO pharmacyDAO, MemberDAO memberDAO) {
		this.pharmacyDAO = pharmacyDAO; 
		this.memberDAO = memberDAO;	 
		
	}
	
	// 회원정보 불러오기
	public MypageDTO detailInfo(Long id) {
		// id 값으로 member 데이터 찾기 
		MemberDTO memberdto = memberDAO.findById(id);
		PharmacyDTO pharmacydto = pharmacyDAO.findByUserId(id);
		MypageDTO dto = new MypageDTO();
		dto.setPharmacyName(pharmacydto.getPharmacyName());
		dto.setPhone(pharmacydto.getPhone());
		dto.setAddress(pharmacydto.getAddress());
		dto.setEmail(memberdto.getEmail());
		dto.setLicenseCode(memberdto.getLicenseCode());
		dto.setDetailInfo(pharmacydto.getDetailInfo());
		return dto;
	}
	
	// 회원정보 세부사항 업데이트
	public boolean updateInfo(MypageDTO mypageDTO, Long userId) {
		PharmacyDTO pharmacyDTO = pharmacyDAO.findByUserId(userId);
		if(pharmacyDTO==null) {
			return false;
		}
		// mypageDTO 객체에 pharmacyDTO의 userId 값 꺼내서 저장 
		mypageDTO.setUserId(pharmacyDTO.getUserId());
		// 업데이트 정보
		int updateInfo = pharmacyDAO.updateDetailInfoPharmacy(mypageDTO);
		if(updateInfo<1) {
			return false;
		} 
		return true;
	}
	
	// 회원탈퇴
	public boolean deleteUser(Long userId) {
		MemberDTO memberDTO = memberDAO.findById(userId);
		
		// member 객체가 없거나 탈퇴 회원인 경우 
		if(memberDTO==null || memberDTO.getIsDelete()!=1) {
			return false;
		} 
		
	 // member isDelete = 0
	    int updated = memberDAO.markIsDelete(userId); 

	    return updated > 0;
	}
	
	
}
