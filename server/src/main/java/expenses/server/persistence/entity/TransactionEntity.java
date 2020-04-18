package expenses.server.persistence.entity;

import expenses.server.rest.dto.TransactionDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "TRANSACTION")
@NoArgsConstructor
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ACCOUNTING_PERIOD_ID")
	private AccountingPeriodEntity accountingPeriod;

	// ran into this issue:
	// https://stackoverflow.com/questions/40247030/detached-entity-passed-to-persist-in-spring-data/40250646
	// so no cascade added
	@ManyToOne
	@JoinColumn(name = "TRANSACTION_CATEGORY_ID")
	private TransactionCategoryEntity category;

	public TransactionEntity(final Integer day, final String description, final Long value, final Long accountingPeriodId, final TransactionCategoryEntity category) {
		this.day = day;
		this.description = description;
		this.value = value;
		this.accountingPeriod = new AccountingPeriodEntity(accountingPeriodId);
		this.category = category;
	}

	public TransactionDTO mapToDto() {
		return new TransactionDTO(id, day, description, value, category.mapToDto());
	}

}
