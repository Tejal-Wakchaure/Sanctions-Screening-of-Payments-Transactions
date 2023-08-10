package com.example.citiproject.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.example.citiproject.entities.Transaction;
import java.util.Date;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ExcelService {

	public String generateExcelFile(List<Transaction> lst) {
		if (!lst.isEmpty()) {
			String fileName = lst.get(0).getFileName();
		    String timeStamp = new SimpleDateFormat("dd-MM-yyyy_HH.mm.ss").format(new Date());
			String filePath ="C:\\Users\\YUVA\\OneDrive\\Documents\\CitiBridgeProject23\\ArchievedFiles\\Archievefile_"+ timeStamp +"_" + fileName +".zip";

			try (Workbook workbook = new XSSFWorkbook()) {
				Sheet sheet = workbook.createSheet(fileName);

				List<String> headers = new ArrayList<String>(
						Arrays.asList("Transaction Reference", "Date", "Payer Name", "Payer Account Number",
								"Payee Name", "Payee Account Number", "Amount", "Validate Status ", "Screen Status","Remark"));

				// Create the header row
				Row headerRow = sheet.createRow(0);
				for (int i = 0; i < 9; i++) {
					Cell headerCell = headerRow.createCell(i);
					headerCell.setCellValue(headers.get(i));
				}

				int rowCount = 1; // Start from the second row for data rows
				for (int i = 0; i < lst.size(); i++) {
					Transaction t = lst.get(i);
					Row row = sheet.createRow(rowCount++);
					row.createCell(0).setCellValue(t.getTransactionReference());
					row.createCell(1).setCellValue(t.getDate());
					row.createCell(2).setCellValue(t.getPayerName());
					row.createCell(3).setCellValue(t.getPayerAccNumber());
					row.createCell(4).setCellValue(t.getPayeeName());
					row.createCell(5).setCellValue(t.getPayeeAccNumber());
					row.createCell(6).setCellValue(t.getAmount());
					row.createCell(7).setCellValue(t.getStatusValidate());
					row.createCell(8).setCellValue(t.getStatusScreen());
					row.createCell(9).setCellValue(t.getRemark());

				}

				try (FileOutputStream outputStream = new FileOutputStream(filePath)) {
					workbook.write(outputStream);
				} catch (IOException e) {
					e.printStackTrace();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			return "success";
		}
		return "list is empty!";
	}
}
