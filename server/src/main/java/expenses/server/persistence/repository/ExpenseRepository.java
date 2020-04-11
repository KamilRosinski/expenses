package expenses.server.persistence.repository;

import expenses.server.persistence.entity.ExpenseEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ExpenseRepository extends CrudRepository<ExpenseEntity, Long> {

	@Query("SELECT YEAR(e.date) AS y, MONTH(e.date) AS m, SUM(e.value) FROM ExpenseEntity AS e GROUP BY y, m ORDER BY y, m DESC")
	List<Object[]> selectMonths();

}
