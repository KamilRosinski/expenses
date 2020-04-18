package expenses.server.persistence.entity;

import expenses.server.rest.dto.TransactionCategoryDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TRANSACTION_CATEGORY")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class TransactionCategoryEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME", unique = true, nullable = false)
	private String name;

	public TransactionCategoryEntity(final String name) {
		this.name = name;
	}

	public TransactionCategoryDTO mapToDto() {
		return new TransactionCategoryDTO(id, name);
	}

}
