package expenses.server.persistence.repository;

import expenses.server.persistence.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

	@Query("SELECT DISTINCT category " +
			"FROM CategoryEntity AS category " +
			"JOIN FETCH category.subcategories " +
			"ORDER BY category.name")
	List<CategoryEntity> getAllCategories();

}
