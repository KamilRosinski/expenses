package expenses.server.persistence.repository;

import expenses.server.persistence.entity.ExpenseEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Map;

public interface ExpenseRepository extends CrudRepository<ExpenseEntity, Long> {

	@Query("SELECT NEW MAP(" +
				"YEAR(ee.date) AS year, " +
				"MONTH(ee.date) AS month, " +
				"SUM(CASE WHEN ee.value > 0 THEN ee.value ELSE 0 END) AS income, " +
				"SUM(CASE WHEN ee.value < 0 THEN ee.value ELSE 0 END) AS outcome) " +
			"FROM ExpenseEntity AS ee " +
			"GROUP BY year, month " +
			"ORDER BY year, month DESC")
	List<Map<String, Object>> getIncomeAndOutcomeGroupedByMonth();

	@Query("FROM ExpenseEntity AS ee WHERE YEAR(ee.date) = :year AND MONTH(ee.date) = :month ORDER BY ee.date DESC")
	List<ExpenseEntity> getExpensesByMonth(final int year, final int month);

}
