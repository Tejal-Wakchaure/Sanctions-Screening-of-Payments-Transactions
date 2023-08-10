package com.example.citiproject.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.example.citiproject.entities.Transaction;
import com.example.citiproject.utils.DBUtils;
import java.util.*;

@Repository
public class TransactionRepository {
	PreparedStatement preparedStatement;

	public String addTransaction(List<Transaction> list) {

		Connection connection = DBUtils.getConnection();
		int cnt = 0;
		try {

			for (int i = 0; i < list.size(); i++) {
				Transaction t = list.get(i);
				String query = "insert into Transactions(fileName,transactionReference,date,payerName,payerAccNumber,payeeName,payeeAccNumber,amount,statusValidate,statusScreen,remark) values (?,?,?,?,?,?,?,?,?,?,?)";

				preparedStatement = connection.prepareStatement(query);
				preparedStatement.setString(1, t.getFileName());
				preparedStatement.setString(2, t.getTransactionReference());
				preparedStatement.setString(3, t.getDate());
				preparedStatement.setString(4, t.getPayerName());
				preparedStatement.setString(5, t.getPayerAccNumber());
				preparedStatement.setString(6, t.getPayeeName());
				preparedStatement.setString(7, t.getPayeeAccNumber());
				preparedStatement.setString(8, t.getAmount());
				preparedStatement.setString(9, t.getStatusValidate());
				preparedStatement.setString(10, t.getStatusScreen());
				preparedStatement.setString(11, t.getRemark());

				int result = preparedStatement.executeUpdate();
				if (result >= 1) {
					cnt++;
				} else {
					return "fail";
				}
			}
			if (cnt == list.size()) {
				return "success";
			}

		} catch (SQLException e) {
			e.printStackTrace();
			return "error";
		} finally {
			DBUtils.closeConnection(connection);
		}
		return "error";
	}

	public List<String> getSanctionedName() {
		List<String> list = null;
		Connection connection = DBUtils.getConnection();
		String selectAllQuery = "SELECT sanctioned_name from sanction_keywords_list";

		try {
			PreparedStatement preparedStatement = connection.prepareStatement(selectAllQuery);
			ResultSet resultSet = preparedStatement.executeQuery();
			while (resultSet.next()) {
				if (list == null) {
					list = new ArrayList<String>(); // to save memory , if there is no data
				}
				list.add(resultSet.getString("sanctioned_name"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(connection);
		}
		return list;
	}

	public String sanctionScreening(List<Transaction> screenedTransaction) {
		Connection connection = DBUtils.getConnection();
		try {

			for (int i = 0; i < screenedTransaction.size(); i++) {
				Transaction t = screenedTransaction.get(i);
				String status = t.getStatusScreen();
				String remark = t.getRemark();
				String ref = t.getTransactionReference();

				String query = "UPDATE transactions set statusScreen='" + status + "', remark='" + remark
						+ "' where transactionReference='" + ref + "' and statusValidate='Pass'";

				PreparedStatement preparedStatement = connection.prepareStatement(query);
				preparedStatement.executeUpdate();

			}
		} catch (SQLException e) {
			e.printStackTrace();
			return "error";
		} finally {
			DBUtils.closeConnection(connection);
		}

		return "success";
	}

	public List<String> getAllTransactionReference(String fileName) {
		List<String> list = null;
		Connection connection = DBUtils.getConnection();

		String selectAllQuery = "SELECT transactionReference from Transactions";

		try {
			String query2 = "DELETE t1 FROM citiprojectdb.transactions t1 JOIN citiprojectdb.transactions t2 ON t1.fileName = t2.fileName WHERE t2.fileName = '"
					+ fileName + "';";

			preparedStatement = connection.prepareStatement(query2);
			preparedStatement.executeUpdate();

			preparedStatement = connection.prepareStatement(selectAllQuery);
			ResultSet resultSet = preparedStatement.executeQuery();
			while (resultSet.next()) {
				if (list == null) {
					list = new ArrayList<String>(); // to save memory , if there is no data
				}
				list.add(resultSet.getString("transactionReference"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(connection);
		}

		return list;
	}

	public List<Transaction> getAllTransactions(String fileName) {
		List<Transaction> list = null;
		Connection connection = DBUtils.getConnection();
		String selectAllQuery = "SELECT * from Transactions where fileName='" + fileName + "'";
		System.out.println(fileName + "  ");

		try {
			PreparedStatement preparedStatement = connection.prepareStatement(selectAllQuery);
			ResultSet resultSet = preparedStatement.executeQuery();
			while (resultSet.next()) {
				if (list == null) {
					list = new ArrayList<Transaction>(); // to save memory , if there is no data
				}
				Transaction t = new Transaction();
				t.setFileName(resultSet.getString("fileName"));
				t.setTransactionReference(resultSet.getString("transactionReference"));
				t.setDate(resultSet.getString("date"));
				t.setPayerName(resultSet.getString("payerName"));
				t.setPayerAccNumber(resultSet.getString("payerAccNumber"));
				t.setPayeeName(resultSet.getString("payeeName"));
				t.setPayeeAccNumber(resultSet.getString("payeeAccNumber"));
				t.setAmount(resultSet.getString("amount"));
				t.setStatusValidate(resultSet.getString("statusValidate"));
				t.setStatusScreen(resultSet.getString("statusScreen"));
				t.setRemark(resultSet.getString("remark"));
				list.add(t);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(connection);
		}
		return list;
	}

	public List<Transaction> getDatabase() {
		List<Transaction> list = null;
		Connection connection = DBUtils.getConnection();
		String selectAllQuery = "SELECT * from Transactions";
		try {
			PreparedStatement preparedStatement = connection.prepareStatement(selectAllQuery);
			ResultSet resultSet = preparedStatement.executeQuery();
			while (resultSet.next()) {
				if (list == null) {
					list = new ArrayList<Transaction>(); // to save memory , if there is no data
				}
				Transaction t = new Transaction();
				t.setFileName(resultSet.getString("fileName"));
				t.setTransactionReference(resultSet.getString("transactionReference"));
				t.setDate(resultSet.getString("date"));
				t.setPayerName(resultSet.getString("payerName"));
				t.setPayerAccNumber(resultSet.getString("payerAccNumber"));
				t.setPayeeName(resultSet.getString("payeeName"));
				t.setPayeeAccNumber(resultSet.getString("payeeAccNumber"));
				t.setAmount(resultSet.getString("amount"));
				t.setStatusValidate(resultSet.getString("statusValidate"));
				t.setStatusScreen(resultSet.getString("statusScreen"));
				t.setRemark(resultSet.getString("remark"));
				list.add(t);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(connection);
		}
		return list;
	}

	public String createTable() {
		int update = 0;
		String query = "CREATE TABLE IF NOT EXISTS Transactions(fileName varchar(50),transactionReference VARCHAR(200),date VARCHAR(200), payerName VARCHAR(200), payerAccNumber VARCHAR(200), payeeName VARCHAR(200), payeeAccNumber VARCHAR(200), amount VARCHAR(200), statusValidate VARCHAR(10),statusScreen VARCHAR(10), remark VARCHAR(200))";

		Connection connection = DBUtils.getConnection();
		try {
			PreparedStatement preparedStatement = connection.prepareStatement(query);
			update = preparedStatement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtils.closeConnection(connection);
		}
		if (update == 0)
			return "success";
		return "error";
	}
}