package expenses.server.persistence.entity;

import expenses.server.rest.dto.TransactionDTO;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "TRANSACTION")
@Getter
public class TransactionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "DAY", nullable = false)
	private Integer day;

	@Column(name = "DESCRIPTION")
	private String description;

	@Column(name = "VALUE", nullable = false)
	private Long value;

	@ManyToOne
	@JoinColumn(name = "TRANSACTION_CATEGORY_ID")
	private TransactionCategoryEntity category;

	public TransactionDTO mapToDto() {
		return new TransactionDTO(id, day, description, value, category.mapToDto());
	}

}
