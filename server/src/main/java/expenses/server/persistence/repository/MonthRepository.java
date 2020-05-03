package expenses.server.persistence.repository;

import expenses.server.persistence.entity.MonthEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface MonthRepository extends JpaRepository<MonthEntity, Long> {

	@Query("SELECT NEW MAP(" +
				"m.id AS id, " +
				"m.year AS year, " +
				"m.month AS month, " +
				"COUNT(t) AS transactionCount, " +
				"SUM(CASE WHEN t.value > 0 THEN t.value ELSE 0 END) AS income, " +
				"SUM(CASE WHEN t.value < 0 THEN t.value ELSE 0 END) AS outcome) " +
			"FROM MonthEntity AS m " +
			"LEFT JOIN m.transactions AS t " +
			"GROUP BY m ")
	List<Map<String, Object>> getOverviews();

}
