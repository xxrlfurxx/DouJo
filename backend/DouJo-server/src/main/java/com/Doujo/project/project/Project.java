package com.Doujo.project.project;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Project {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private long id;
		private String projectname;
//		private List<Milestone>;
		private String startdate;
		private String enddate;
		private String manager;
		private String enginner;
		@Column(columnDefinition = "VARCHAR(1000)")
		private String memo;
		
	
}
