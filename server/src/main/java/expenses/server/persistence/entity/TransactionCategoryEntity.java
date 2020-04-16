package expenses.server.persistence.entity;

import expenses.server.rest.dto.TransactionCategoryDTO;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TRANSACTION_CATEGORY")
@Getter
public class TransactionCategoryEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME", nullable = false)
	private String name;

	public TransactionCategoryDTO mapToDto() {
		return new TransactionCategoryDTO(id, name);
	}

}
