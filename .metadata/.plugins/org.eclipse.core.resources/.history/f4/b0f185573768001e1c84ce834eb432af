package com.example.demo;

import java.util.Date;
import java.util.UUID; // Import UUID class

import javax.persistence.Id;


import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "enableIncident")
public class EnableIncident{

	@Id
	private UUID id;
	private String email;
	private String incidentTitle;
	private String incidentDescription;
	private String location;
	private String cubicle;
	private String category;
	private String priority;
	private String assignedTo;
	private String status;
	private String resolutionDescription;
	private Date resolutionDate;
	private Date dateOfIncident;
	
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public String getIncidentTitle() {
		return incidentTitle;
	}
	public void setIncidentTitle(String incidentTitle) {
		this.incidentTitle = incidentTitle;
	}
	public String getIncidentDescription() {
		return incidentDescription;
	}
	public void setIncidentDescription(String incidentDescription) {
		this.incidentDescription = incidentDescription;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getCubicle() {
		return cubicle;
	}
	public void setCubicle(String cubicle) {
		this.cubicle = cubicle;
	}
	
	
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	
	public String getAssignedTo() {
		return assignedTo;
	}
	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getResolutionDescription() {
		return resolutionDescription;
	}
	public void setResolutionDescription(String resolutionDescription) {
		this.resolutionDescription = resolutionDescription;
	}
	public Date getResolutionDate() {
		return resolutionDate;
	}
	public void setResolutionDate(Date resolutionDate) {
		this.resolutionDate = resolutionDate;
	}
	public Date getDateOfIncident() {
		return dateOfIncident;
	}
	public void setDateOfIncident(Date dateOfIncident) {
		this.dateOfIncident = dateOfIncident;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "EnableIncident [id=" + id + ", email=" + email + ", incidentTitle=" + incidentTitle
				+ ", incidentDescription=" + incidentDescription + ", location=" + location + ", cubicle=" + cubicle
				+ ", category=" + category + ", priority=" + priority + ", assignedTo=" + assignedTo + ", status="
				+ status + ", resolutionDescription=" + resolutionDescription + ", resolutionDate=" + resolutionDate
				+ ", dateOfIncident=" + dateOfIncident + "]";
	}
	
	
	
	
	

}
