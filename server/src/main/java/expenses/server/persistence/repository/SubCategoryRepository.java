package expenses.server.persistence.repository;

import expenses.server.persistence.entity.SubCategoryEntity;
import org.springframework.data.repository.CrudRepository;

public interface SubCategoryRepository extends CrudRepository<SubCategoryEntity, Long> {
}
