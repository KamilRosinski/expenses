package expenses.server.persistence.repository;

import expenses.server.persistence.entity.CategoryEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CategoryRepository extends CrudRepository<CategoryEntity, Long> {

	@Query("SELECT DISTINCT category " +
			"FROM CategoryEntity AS category " +
			"JOIN FETCH category.subcategories " +
			"ORDER BY category.name")
	List<CategoryEntity> getAllCategories();

}
