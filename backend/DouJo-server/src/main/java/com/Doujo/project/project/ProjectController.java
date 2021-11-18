package com.Doujo.project.project;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Doujo.project.lib.TextProcesser;

@RestController
public class ProjectController {
	
		private ProjectRepository repo;
		
		@Autowired
		public ProjectController(ProjectRepository repo) {
			this.repo = repo;
		}

		@GetMapping(value = "/project/{id}")
		public Project getProject(@PathVariable long id) {
			return repo.findById(id).orElse(null);
		}
		
		@GetMapping(value = "/project")
		public List<Project> getProjects(HttpServletRequest req, HttpServletResponse res) {
			return null;
			
			
		}
		
		@PostMapping(value = "/project")
		public Project addProject(@RequestBody Project project, HttpServletRequest req, HttpServletResponse res) {
			
			if(TextProcesser.isEmpyText(project.getProjectname())) {
				res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return null;
			}
			
			if (TextProcesser.isEmpyText(project.getStartdate())) {
				res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return null;
			}	
			
			if (TextProcesser.isEmpyText(project.getEnddate())) {
					res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					return null;
			}
			
			Project projectItem = Project.builder()
								.projectname(project.getProjectname())
								.startdate(project.getStartdate())
								.enddate(project.getEnddate())
								.manager(project.getManager())
								.enginner(project.getEnginner())
								.build();
			
			Project projectSaved = repo.save(projectItem);
			
			res.setStatus(HttpServletResponse.SC_CREATED);
			
			return projectSaved;
								 
}
		
		@DeleteMapping(value = "/project/{id}")
		public boolean removeProject(@PathVariable long id,  HttpServletRequest req, HttpServletResponse res) {
			
			if(project.isEmpty() ) {
				// 404: 리소스 없음
				res.setStatus(HttpServletResponse.SC_NOT_FOUND);
				return false;
			}
			
			repo.deleteById(id);
			
			return true;
		}
		
		@PutMapping(value = "/project/{id}")
		public Project modifyProject(@PathVariable long id, @RequestBody Project project, HttpServletRequest req, HttpServletResponse res) {
			
			if (ProjectItem.isEmpty()) {
				// 404: 리소스 없음
				res.setStatus(HttpServletResponse.SC_NOT_FOUND);
				return null;
		}
			// 타이틀이 빈값
			if (TextProcesser.isEmpyText(project.getProjectname())) {
				res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return null;
			}
			
			if (TextProcesser.isEmpyText(project.getStartdate())) {
				res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return null;
			}	
			
			if (TextProcesser.isEmpyText(project.getEnddate())) {
					res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					return null;
			}
			Project projectToSave = projectItem.get();
			
			projectToSave.setProjectname(project.getProjectname());
			projectToSave.setStartdate(project.getStartdate());
			projectToSave.setEnddate(project.getEnddate());
			projectToSave.setManager(project.getManager());
			projectToSave.setEnginner(project.getEnginner());
			projectToSave.setMemo(TextProcesser.getPlainText(project.getMemo()));
			
			return repo.save(projectToSave);
			
		}
}
