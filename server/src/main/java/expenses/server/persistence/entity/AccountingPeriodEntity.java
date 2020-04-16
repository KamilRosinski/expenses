package expenses.server.persistence.entity;

import expenses.server.rest.dto.AccountingPeriodDTO;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "ACCOUNTING_PERIOD")
@Getter
public class AccountingPeriodEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "START_DATE", nullable = false)
	private Date startDate;

	@Column(name = "DURATION", nullable = false)
	private Long duration;

	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name = "ACCOUNTING_PERIOD_ID")
	@OrderBy("DATE_OFFSET DESC")
	private List<TransactionEntity> transactions;

	public AccountingPeriodDTO mapToDto() {
		return new AccountingPeriodDTO(
				id,
				startDate.toLocalDate(),
				startDate.toLocalDate().plusDays(duration.longValue()),
				transactions.stream()
						.map(transaction -> transaction.mapToDto(startDate))
						.collect(Collectors.toList())
		);
	}

}
