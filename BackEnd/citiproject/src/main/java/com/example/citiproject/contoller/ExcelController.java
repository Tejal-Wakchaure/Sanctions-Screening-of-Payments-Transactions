package com.example.citiproject.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.citiproject.entities.Transaction;
import com.example.citiproject.service.ExcelService;
import com.example.citiproject.service.TransactionService;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class ExcelController {

	@Autowired
	private ExcelService excelService;

	@Autowired
	TransactionService transactionService;

	@GetMapping("/archiveResults")
	public String createExcelFile() {
		List<Transaction> data = new ArrayList<>();
		data = transactionService.listToArchive();
		return excelService.generateExcelFile(data);
	}
}
