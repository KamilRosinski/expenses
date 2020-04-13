package expenses.server.persistence.repository;

import expenses.server.persistence.entity.ExpenseEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Map;

public interface ExpenseRepository extends CrudRepository<ExpenseEntity, Long> {

	@Query("SELECT NEW MAP(" +
				"YEAR(expense.date) AS year, " +
				"MONTH(expense.date) AS month, " +
				"SUM(CASE WHEN expense.value > 0 THEN expense.value ELSE 0 END) AS income, " +
				"SUM(CASE WHEN expense.value < 0 THEN expense.value ELSE 0 END) AS outcome) " +
			"FROM ExpenseEntity AS expense " +
			"GROUP BY year, month " +
			"ORDER BY year, month DESC")
	List<Map<String, Object>> getIncomeAndOutcomeGroupedByMonth();

	@Query("FROM ExpenseEntity AS expense " +
			"WHERE YEAR(expense.date) = :year AND MONTH(expense.date) = :month " +
			"ORDER BY expense.date DESC")
	List<ExpenseEntity> getExpensesByMonth(int year, int month);

}
