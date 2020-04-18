package expenses.server.persistence.repository;

import expenses.server.persistence.entity.TransactionCategoryEntity;
import org.springframework.data.repository.CrudRepository;

public interface TransactionCategoryRepository extends CrudRepository<TransactionCategoryEntity, Long> {
}
