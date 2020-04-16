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
import java.sql.Date;

@Entity
@Table(name = "TRANSACTION")
@Getter
public class TransactionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "DATE_OFFSET", nullable = false)
	private Long dateOffset;

	@Column(name = "DESCRIPTION")
	private String description;

	@Column(name = "VALUE", nullable = false)
	private Long value;

	@ManyToOne
	@JoinColumn(name = "TRANSACTION_CATEGORY_ID")
	private TransactionCategoryEntity category;

	public TransactionDTO mapToDto(final Date accountingPeriodStartDate) {
		return new TransactionDTO(id, accountingPeriodStartDate.toLocalDate().plusDays(dateOffset.longValue()), description, value, category.mapToDto());
	}

}
