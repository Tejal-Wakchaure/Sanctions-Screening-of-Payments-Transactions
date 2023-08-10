package com.example.citiproject.entities;

import org.springframework.stereotype.Component;

//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Component
@AllArgsConstructor
@NoArgsConstructor

@Data
public class Transaction {
	private String fileName = "-";
	private String transactionReference = "-";
	private String Date = "-";
	private String payerName = "-";
	private String payerAccNumber = "-";
	private String payeeName = "-";
	private String payeeAccNumber = "-";
	private String amount = "-";
	private String statusValidate = "pending";
	private String statusScreen = "pending";
	private String remark="";

}
