package com.Doujo.project.project;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


// project ���̺� ������ �� �ִ� �⺻���� �޼������ ����� �� ����

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

	
	
	List<Project> findByDescriptionContaining(String description);
}