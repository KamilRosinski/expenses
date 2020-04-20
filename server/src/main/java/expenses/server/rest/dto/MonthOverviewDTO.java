package expenses.server.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.YearMonth;

@AllArgsConstructor
@Getter
public class MonthOverviewDTO {

	private final Long id;

	private final YearMonth yearMonth;

	private final Long transactionCount;

	private final Long income;

	private final Long outcome;

}
