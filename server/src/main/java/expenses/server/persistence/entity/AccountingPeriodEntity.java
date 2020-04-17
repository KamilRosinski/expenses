package expenses.server.persistence.entity;

import expenses.server.rest.dto.AccountingPeriodDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
import javax.persistence.UniqueConstraint;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "ACCOUNTING_PERIOD", uniqueConstraints = @UniqueConstraint(columnNames = {"YEAR", "MONTH"}))
@NoArgsConstructor
@Getter
public class AccountingPeriodEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "YEAR", nullable = false)
	private Integer year;

	@Column(name = "MONTH", nullable = false)
	private Integer month;

	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name = "ACCOUNTING_PERIOD_ID")
	@OrderBy("DAY DESC")
	private List<TransactionEntity> transactions = new ArrayList<>();

	public AccountingPeriodEntity(final Integer year, final Integer month) {
		this.year = year;
		this.month = month;
	}

	public AccountingPeriodDTO mapToDto() {
		final YearMonth yearMonth = YearMonth.of(year.intValue(), month.intValue());
		return new AccountingPeriodDTO(
				id,
				yearMonth,
				Integer.valueOf(yearMonth.lengthOfMonth()),
				transactions.stream()
						.map(TransactionEntity::mapToDto)
						.collect(Collectors.toList())
		);
	}

}
