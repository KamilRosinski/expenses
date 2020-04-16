package expenses.server.rest.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@RequiredArgsConstructor
@Getter
public class AccountingPeriodOverviewDTO {

	private final Long id;

	private final LocalDate startDate;

	private final LocalDate endDate;

	private final Long income;

	private final Long outcome;

}
