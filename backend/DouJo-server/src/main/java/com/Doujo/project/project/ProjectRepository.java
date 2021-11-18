package com.Doujo.project.project;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


// project 테이블에 접근할 수 있는 기본적인 메서드들을 사용할 수 있음

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

	
	
	List<Project> findByDescriptionContaining(String description);
}