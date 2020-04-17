package expenses.server.persistence.repository;

import expenses.server.persistence.entity.AccountingPeriodEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Map;

public interface AccountingPeriodRepository extends CrudRepository<AccountingPeriodEntity, Long> {

	@Query("SELECT NEW MAP(" +
				"ap.id AS id, " +
				"ap.year AS year, " +
				"ap.month AS month, " +
				"COUNT(t) AS transactionCount, " +
				"SUM(CASE WHEN t.value > 0 THEN t.value ELSE 0 END) AS income, " +
				"SUM(CASE WHEN t.value < 0 THEN t.value ELSE 0 END) AS outcome) " +
			"FROM AccountingPeriodEntity AS ap " +
			"LEFT JOIN ap.transactions AS t " +
			"GROUP BY ap " +
			"ORDER BY year DESC, month DESC")
	List<Map<String, Object>> getIncomeAndOutcome();

}
